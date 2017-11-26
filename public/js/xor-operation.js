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

//create a 2-3-1 connected net
let skynet = new XORCalculator(2, 3, 1);
//giving a learning rate of 0.3 and iteration 10000 times, train our net!
skynet.trainModel(0.3, 10000);
//lets test out our net!
skynet.testModel([0, 0], 0);
skynet.testModel([0, 1], 1);
skynet.testModel([1, 0], 1);
skynet.testModel([1, 1], 0);
