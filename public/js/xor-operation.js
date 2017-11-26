const Neuron = synaptic.Neuron;
const Layer = synaptic.Layer;
const Network = synaptic.Network;
const Trainer = synaptic.Trainer;
const Architect = synaptic.Architect;

class XORCalculator {
  /**
   * A simple XOR calculator neural net made with synaptic.js
   * 
   * @param {Number} input The number of neurons to be created for the input layer
   * @param {Number} hidden The number of neurons to be created for the hidden layer
   * @param {Number} output The number of neurons to be created for the output layer
   */
  constructor(input, hidden, output) {
    let inputLayer = new Layer(input);
    let hiddenLayer = new Layer(hidden);
    let outputLayer = new Layer(output);

    //link the input layer to the hidden layer
    inputLayer.project(hiddenLayer);
    //link the hidden layer to the output layer
    hiddenLayer.project(outputLayer);
    // input neurons -> hidden neurons -> output neurons

    this.net = new Network({
      input: inputLayer,
      hidden: [hiddenLayer],
      output: outputLayer
    });
  }

  /**
   * Trains the calculator on the 'test data' - all four possible cases for XOR
   * 
   * @param {Number} learning_rate How much the network should adjust its weights during back propagation
   * @param {Number} iterations How many times to iterate over the training data
   */
  trainModel(learning_rate, iterations) {
    //clear any previous memory from previous runs
    this.net.clear();
    for (let i = 0; i < iterations; i++) {
      //CASE: 0 XOR 0 => 0
      //we activate the network with the data point [0, 0]
      this.net.activate([0, 0]);
      //after this forward propagation, we need to do a backpropogation to update the weights/biases
      this.net.propagate(learning_rate, [0]);
      //then we continue with the rest of our training data

      //CASE: 0 XOR 1 => 1
      this.net.activate([0, 1]);
      this.net.propagate(learning_rate, [1]);

      //CASE: 1 XOR 0 => 1
      this.net.activate([1, 0]);
      this.net.propagate(learning_rate, [1]);

      //CASE: 1 XOR 1 => 0
      this.net.activate([1, 1]);
      this.net.propagate(learning_rate, [0]);
    }
  }

  /**
   * Calculates the XOR of the two given parameters
   */
  calculate(x, y) {
    return this.net.activate([x, y]);
  }

  /**
   * Ensure XOR calculation was correct
   * 
   * @param {Array} data_point A data point to test in the form of [x, x]
   * @param {*} answer What the data point should evaluate to
   */
  testModel(data_point, answer) {
    let compute_value = this.net.activate(data_point);
    console.log(`Given data-point ${data_point} => ${compute_value}`);
    console.assert(Math.round(compute_value) === answer, 'Net did not calculate correct value');
  }
}

function runSet(learning_rate, iterations) {
  //create a 2-3-1 connected net
  let skynet = new XORCalculator(2, 3, 1);
  skynet.trainModel(learning_rate, iterations);
  skynet.testModel([0, 0], 0);
  skynet.testModel([0, 1], 1);
  skynet.testModel([1, 0], 1);
  skynet.testModel([1, 1], 0);
}

var _XORCalculator = new XORCalculator(2, 3, 1);
_XORCalculator.trainModel(0.3, 1000);

runSet(0.3, 1000);

function runAllTests() {
  //Lets see what it looks like with a very low learning rate of 0.000001 and small amount of iterations
  runSet(0.000001, 100);

  //Lets increase the learning rate a little and see as the iterations grow how the data changes
  for (let i = 100; i < 10000; i += 100) {
    runSet(0.001, i);
  }

  //lets do a ton of iterations now
  runSet(0.001, 10000000);

  //lets try bumping up the learning rate since it's definitely not adapting fast enough
  runSet(0.1, 100);

  //lets do more iterations with this better learning rate
  runSet(0.1, 10000);

  //lets tweak a little more
  runSet(0.3, 100);
}
