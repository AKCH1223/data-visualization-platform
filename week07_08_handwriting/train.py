import mnist_loader
import numpy as np
from network import Network

def vectorized_result(j):
    e = np.zeros((10,1))
    if hasattr(j, '__len__') and not isinstance(j, int):
        j = int(j[0])
    e[j] = 1.0
    return e


if __name__ == "__main__":
    training_data, validation_data, test_data = mnist_loader.load_data_wrapper()

    net = Network([784, 30, 10])
    net.SGD(training_data, epochs=30, mini_batch_size=10, eta=3.0, test_data=test_data)

    net.save("model_params.pkl")
    print("训练完成，模型已保存")
