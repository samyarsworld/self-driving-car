# self-driving-car

## A real-world cutting-edge deep learning project, simplified to illustrate a self-driving car.

A link to the live website can be found here: https://self-driving-car-ln2n.onrender.com/

## Index
1. [About](#about)
2. [Demo](#demo)
3. [Technologies](#tech)
4. [Usage](#usage)
    * [Installation](#installation)
5. [Developer Features](#dev)
6. [Future Improvements](#future)
    * [Efficiency and AI Power](#power)
    * [Design](#design)
7. [Credits](#credits) 
8. [License](#license)
 

<a name="about"></a>
## About
I have developed a cutting-edge system that leverages neural networks to enable autonomous decision-making in real time. By employing advanced physics and mathematical concepts, my digital self-driving car gathers crucial data about traffic conditions, lane configurations, and road edges to inform its navigation choices.

The core of this project lies in the powerful neural network algorithms that process the collected data and make intelligent decisions regarding changing directions and adapting to various traffic scenarios. Through an iterative process, the system continuously evaluates the performance of different cars on the road, allowing the identification of the most successful specimen.

This project represents a captivating convergence of computer science, machine learning, and transportation engineering.

The main features include:

* Object-oriented design in JavaScript
* Algorithm implementation to power a neural network with 3 layers
* Frontend design using JavaScript Canvas and Context
* Design a sensor object to collect data using mathematical and physical concepts
* Specimen save capability to browser local storage
* Visualization of the neural network (taken from Radu Mariescu-Istodor visualization code)

<a name="demo"></a>
## Demo
A GUI of the self-driving car:
<p align="center"><img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2plZGRyYWMwampvbnljc3hlaHhscm1oZ244bmJkMDVlbXQ2N2NvcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/idPaw8hekMD8kIZEkT/giphy.gif" width="600"/>
</p>


<a name="tech"></a>
## Technologies
- JavaScript
- Math and Physics
- HTML
- CSS
- Flask (future)

<a name="usage"></a>
## Usage
A link to the live website can be found here:

https://self-driving-car-ln2n.onrender.com/

To see the best result of your specie development, as soon as you see a car outperforming the others (passing the traffic), click on the save button in the middle of the screen. That will save this particular car to your browser's local storage and when you refresh the page, the saved species will be used to create new species that can most likely do better. The delete button will delete the saved specie from your local storage.


<a name="installation"></a>
### Installation

```
git clone https://github.com/samyarsworld/self-driving-car.git
cd self-driving-car/drive
```
Open index.html in the browser.


<a name="dev"></a>
## Developer Features
Here are some technical considerations that were used to build and design this project:

**Built a neural network without any libraries:** A neural network with 3 layers, including 1 input layer with 4 nodes, 1 hidden layer with 6 nodes, and 1 output layer with 4 nodes, is implemented.

**Neural network object design:** The neural network object creates the levels with the corresponding number of nodes, calculates weights and biases, and feeds information to the next neural layer. 

**Sensor object:** A sensor object on top of the car is created to collect information about the cars surrounding. The number of rays and their length for them are defined, and distance information of the upcoming obstacle is calculated using linear algebra and physics concepts.

**Car object:** A car object is designed to hold information regarding the car, including its direction, speed, acceleration, brake, steer angle, and if it has got into an accident.

**Visuals and frontend:** JavaScript in conjunction with HTML is used to bring visuals to the browser. More specifically, the canvas element is used from HTML and manipulated by JavaScript to create a dynamic environment.


<a name="future"></a>
## Future Improvements
<a name="power"></a>
### Efficiency and AI Power
There are several ways that the AI and algorithms of the game could be improved in the future. Here are a few suggestions:

- **Experiment with deeper neural network architectures:** Explore adding more hidden layers to your neural network to increase its capacity for learning and decision-making. Deeper architectures can potentially capture more complex patterns and relationships within the input data.

- **Implement advanced activation functions:**  Investigate alternative activation functions such as ReLU (Rectified Linear Unit) or Leaky ReLU, which can enhance the network's ability to model non-linear relationships in the data.

- **Regularization techniques:** Incorporate regularization techniques like dropout or L1/L2 regularization to prevent overfitting and improve the generalization capabilities of your neural network.

- **Data augmentation:** Augment your training data by applying transformations such as rotation, scaling, or adding noise. This technique can help increase the diversity of the training set, improving the model's robustness and performance.

- **Early stopping:** Implement early stopping techniques to prevent overfitting and find the best iteration where the model generalizes well on unseen data.


<a name="design"></a>
### Design

- **User interaction:** Allow users to interact with the self-driving car simulation, such as modifying the environment or introducing specific scenarios, to test the car's performance and evaluate different AI algorithms.

- **More sophisticated roads:** Other more complicated roads can be designed to more accurately replicate real-world roads and tracks. Note that, distance calculations, car steering movement, and information picked up by the sensors will have to be modified to account for various angles of the road.

 - **Implement automatic traffic generator and more:** The upcoming traffic needs to be automized for an infinite number of randomized traffic ahead. In addition, other road blocks such as horizontally passing pedestrians and animals, or construction sites can be added.


<a name="credits"></a>
## Credits

- SAMYAR FARJAM (https://github.com/samyarsworld)

If you'd like to contribute to this project, please feel free to submit a pull request or open an issue on our [GitHub repository](https://github.com/samyarsworld/self-driving-car). All contributions and feedback are welcome.

<a name="license"></a>
## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the `LICENSE` file for details.

