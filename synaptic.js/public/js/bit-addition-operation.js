const Neuron = synaptic.Neuron;
const Layer = synaptic.Layer;
const Network = synaptic.Network;
const Trainer = synaptic.Trainer;
const Architect = synaptic.Architect;

//32 nodes per input - each for a single bit
const IN_NODES = 32;
const MID_NODES = 16;

var _network = new Architect.Perceptron(2 * IN_NODES, MID_NODES, IN_NODES);

var _trainer = new Trainer(_network);

const trainingSet = [];

/**
 * Convert a value to a padded binary number representing it
 * @param {Number} value 
 */
function normalizeToBinary(value) {
  return value.toString(2);
}

function buildTrainingSet() {
  let trainingSet = [];

  for (let i = 0; i < 32; i++) {
    let value1 = (2**i).toString(2);
    for (let j = 0; j < 32; j++) {
      let value2 = (2**j).toString(2);
      //add to training set but first pad the values with 0s
    }
  }

  return trainingSet;
}
