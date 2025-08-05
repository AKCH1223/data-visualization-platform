import mnist_loader
import network

# 加载 MNIST 数据集
training_data, validation_data, test_data = mnist_loader.load_data_wrapper()

# 创建一个神经网络：784个输入节点, 30个隐藏层节点, 10个输出节点（对应数字0-9）
net = network.Network([784, 30, 10])

# 训练网络：30轮，每批10个样本，学习率3.0，用验证集评估准确率
net.SGD(training_data, epochs=30, mini_batch_size=10, eta=3.0, test_data=test_data)
