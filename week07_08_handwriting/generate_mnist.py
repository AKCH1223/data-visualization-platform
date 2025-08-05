import urllib.request
import os

def download_mnist_pkl():
    url = "https://github.com/mnielsen/neural-networks-and-deep-learning/raw/master/data/mnist.pkl.gz"
    output_path = "mnist.pkl.gz"

    if os.path.exists(output_path):
        print("mnist.pkl.gz already exists.")
    else:
        print("Downloading mnist.pkl.gz...")
        urllib.request.urlretrieve(url, output_path)
        print("Download complete.")

if __name__ == "__main__":
    download_mnist_pkl()
