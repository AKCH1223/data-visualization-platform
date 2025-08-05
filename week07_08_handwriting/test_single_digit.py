import numpy as np
from PIL import Image
from network import Network

def load_image(path):
    img = Image.open(path).convert('L')  # 灰度
    img = img.resize((28, 28))
    data = np.array(img).reshape(784, 1)
    data = 255 - data  # 反色，白底黑字
    data = data / 255.0
    return data

if __name__ == "__main__":
    net = Network([784, 30, 10])
    net.load("model_params.pkl")  # 加载训练好的参数
    img_data = load_image("test_digit.png")  # 你要测试的图片路径
    pred = net.predict(img_data)
    print(f"识别结果是数字: {pred}")
