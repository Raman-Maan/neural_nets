const Neuron = synaptic.Neuron;
const Layer = synaptic.Layer;
const Network = synaptic.Network;
const Trainer = synaptic.Trainer;
const Architect = synaptic.Architect;

class AdditionCalculator {
  constructor() {
    //the number of input layers is the amount of inputs our network will take
    let inputLayer = new Layer(2);
    //the number of neurons in hidden layer: look more into different algorithms for pruning excess nodes
    let hiddenLayer = new Layer(2);
    //output layers is just 1 since we only want a single numerical value
    let outputLayer = new Layer(1);

    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);
    this.net = new Network({
      input: inputLayer,
      hidden: [hiddenLayer],
      output: outputLayer
    });

    //the largest sum the training data will produce
    this.max_addition_value = 20;
  }

  add(x, y) {
    return (this.net.activate([this.normalizeValue(x), this.normalizeValue(y)]))[0]*this.max_addition_value;
  }

  trainModel(learning_rate, iterations) {
    this.net.clear();
    for(let i = 0; i < iterations; i++) {
      for(let x = 0; x <= this.max_addition_value/2; x += 3) {
        for(let y = 0; y <= this.max_addition_value/2; y += 2) {
          this.net.activate([this.normalizeValue(x), this.normalizeValue(y)]);
          this.net.propagate(learning_rate, [this.normalizeValue(x + y)]);
        }
      }
    }

    console.log('Completed training');
  }

  /**
   * We must normalize our values so our network can use them
   * @param {Number} x 
   */
  normalizeValue(x) {
    return x/this.max_addition_value;
  }

  testModel(x, y) {
    let compute_value = this.add(x, y);
    let result = Math.round(compute_value) === x + y ? 'PASS' : 'FAILURE'
    console.log(`${x} + ${y} = ${compute_value} [${result}]`);
    console.assert(result === 'PASS', `${x} + ${y} != ${compute_value}`);
  }
}

var _AdditionCalculator = new AdditionCalculator();
_AdditionCalculator.trainModel(0.3, 30000);

for(let x = 0; x < _AdditionCalculator.max_addition_value/2; x++) {
  for(let y = 0; y < _AdditionCalculator.max_addition_value/2; y++) {
    _AdditionCalculator.testModel(x, y);
  }
}
