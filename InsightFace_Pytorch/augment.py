import imutils
import random
import numpy as np
import cv2


def rotate(img):
    angle = random.randrange(-15, 15)
    rotated = imutils.rotate_bound(img, angle)
    return rotated


def get_brightness(img):
    img = cv2.resize(img, (10, 10))
    L, A, B = cv2.split(cv2.cvtColor(img, cv2.COLOR_BGR2LAB))
    L = L / np.max(L)
    return np.mean(L)


def brighten(img):
    mImage = img
    hsvImg = cv2.cvtColor(mImage, cv2.COLOR_BGR2HSV)
    value = 100 * (1 - get_brightness(img))
    vValue = hsvImg[..., 2]
    hsvImg[..., 2] = np.where((255 - vValue) < value, 255, vValue + value)
    return cv2.cvtColor(hsvImg, cv2.COLOR_HSV2RGB)


def darken(img):
    mImage = img
    hsvImg = cv2.cvtColor(mImage, cv2.COLOR_BGR2HSV)
    hsvImg[..., 2] = hsvImg[..., 2] * 1
    return cv2.cvtColor(hsvImg, cv2.COLOR_HSV2RGB)


def blur(img):
    return cv2.blur(img, (5, 5))


def noise(img):
    row, col, ch = img.shape
    mean = 0
    var = 0.1
    sigma = var ** 0.5
    gauss = np.random.normal(mean, sigma, (row, col, ch))
    gauss = gauss.reshape(row, col, ch)
    noisy = img + gauss
    return noisy
