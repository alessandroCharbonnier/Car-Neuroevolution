class NeuralNetwork {
    constructor(a, b, c, d, e) {
        if (a instanceof tf.Sequential) {
            this.model = a;
            this.input_nodes = b;
            this.hidden_nodes = c;
            this.hidden_node_layers = e;
            this.output_nodes = d;
        } else {
            this.input_nodes = a;
            this.hidden_nodes = b;
            this.hidden_node_layers = e;
            this.output_nodes = c;
            this.model = this.createModel();
        }
    }

    copy() {
        return tf.tidy(() => {
            const modelCopy = this.createModel();
            const weights = this.model.getWeights();
            const weightCopies = [];
            for (let i = 0; i < weights.length; i++) {
                weightCopies[i] = weights[i].clone();
            }
            modelCopy.setWeights(weightCopies);
            return new NeuralNetwork(modelCopy, this.input_nodes, this.hidden_nodes, this.output_nodes);
        });
    }

    mutate(rate) {
        tf.tidy(() => {
            const weights = this.model.getWeights();
            const mutatedWeights = [];
            for (let i = 0; i < weights.length; i++) {
                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice();
                for (let j = 0; j < values.length; j++) {
                    if (random(1) < rate) {
                        let w = values[j];
                        values[j] = w + randomGaussian();
                    }
                }
                let newTensor = tf.tensor(values, shape);
                mutatedWeights[i] = newTensor;
            }
            this.model.setWeights(mutatedWeights);
        });
    }

    dispose() {
        this.model.dispose();
    }

    predict(inputs) {
        return tf.tidy(() => {
            const xs = tf.tensor2d([inputs]);
            const ys = this.model.predict(xs);
            const outputs = ys.dataSync();
            // console.log(outputs);
            return outputs;
        });
    }

    createModel() {
        const model = tf.sequential();
        model.add(
            tf.layers.dense({
                units: this.hidden_nodes,
                inputShape: [this.input_nodes],
                activation: "sigmoid"
            })
        );
        for (let i = 0; i < this.hidden_node_layers; i++) {
            model.add(
                tf.layers.dense({
                    units: this.hidden_nodes,
                    activation: "sigmoid"
                })
            );
        }
        model.add(
            tf.layers.dense({
                units: this.output_nodes,
                activation: "softmax"
            })
        );
        return model;
    }
}
