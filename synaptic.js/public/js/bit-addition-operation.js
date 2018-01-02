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

var _testSet = buildTrainingSet();

console.log('Beginning to train network...');

_trainer.train(_testSet, {
  rate: 0.1,
  iterations: 2000,
  //error: 0.005,
  log: 100,
  cost: Trainer.cost.CROSS_ENTROPY
});

console.log('Training complete!\nBeginning testing!');

testModel();


/**
 * Convert a value to a padded binary number
 * @param {Number} value 
 */
function normalize(value) {
  if (value < 0 || value > Number.MAX_VALUE) {
    throw new Error('Normalizing an out of bounds value: ' + value);
  }
  let result = value.toString(2);

  //if overflow, reset value to 0
  if (result.length > IN_NODES) {
    result = 0..toString(2);
  }

  //pad values
  result = result.padStart(IN_NODES, 0);

  return result;
}

/**
 * Build training set
 * Interesting cases:
 *  - Each bit
 *  - Each bit - 1
 *  - 0 and Number.MAX_SAFE_INTEGER
 */
function buildTrainingSet() {
  let trainingSet = [];

  //Each bit combination in each place
  for (let i = 0; i < IN_NODES; i++) {
    for (let j = 0; j < IN_NODES; j++) {
      addToTrainingSet(2**i, 2**j);
      addToTrainingSet(i*i, j*j);
    }
  }

  addToTrainingSet(0, 0);

  return trainingSet;

  function addToTrainingSet(val1, val2) {
    trainingSet.push({
      input: [...normalize(val1), ...normalize(val2)],
      output: [...normalize(val1 + val2)]
    })
  }
}

function testModel() {
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 10; j++) {
      let compute = _network.activate([...normalize(i), ...normalize(j)]);
      let result = compute.map(x => Math.round(x));
      console.assert(result.join('') === normalize(i + j))
    }
  }
}
