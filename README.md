
# SBOL Home

A web application for the design and simulation of genetic circuits using the [Synthetic Biology Open Language (SBOL) standard.](https://sbolstandard.org/) Developed under the [Genetic Logic Lab](https://geneticlogiclab.org/) lead by [Dr. Chris Myers](https://www.colorado.edu/ecee/chris-myers) at the University of Colorado Boulder.

<img src="https://user-images.githubusercontent.com/11147616/166881423-8c414ac7-75d8-4e5c-92ed-90f9d05dc81d.png" width="23%"></img> 
## Microservice Components

| **User Interface** | [home-frontend/](https://github.com/zachsents/SBOL-Home/tree/master/home-frontend) |
|----------|----------------|

A React-based interface that utilizes the browser's local storage as a simple database. Uses the [Mantine](https://mantine.dev/) the component library for interface components, forms, utility hooks, etc.

<img src="https://user-images.githubusercontent.com/11147616/166882454-99071d29-41e9-4b7c-9c3f-3a543daf7d28.png" width="23%"></img> <img src="https://user-images.githubusercontent.com/11147616/166882370-08fcc885-759f-4915-b29e-7faa2fec1b4d.png" width="23%"></img> <img src="https://user-images.githubusercontent.com/11147616/166882320-10d149df-2a36-41cf-a5f1-a34c89b28472.png" width="23%"></img> 

&nbsp;

| **API** | [api/](https://github.com/zachsents/SBOL-Home/tree/master/api) |
|----------|----------------|

Express-based endpoints for receiving and queueing simulation requests and fetching simulation progress and results. Uses MongoDB for storing and monitoring these requests.

<img src="https://user-images.githubusercontent.com/11147616/166837633-e43f877a-c956-4360-b147-87341e561459.png" width="23%"></img> <img src="https://user-images.githubusercontent.com/11147616/166837683-c6dd4d37-d7ab-4685-bcb6-de6a5e0b5f02.png" width="23%"></img> <img src="https://user-images.githubusercontent.com/11147616/166837855-75b0e017-a97b-413d-a6ec-ba9d4940e576.png" width="23%"></img> 

&nbsp;

| **Queue Monitor** | [watcher/](https://github.com/zachsents/SBOL-Home/tree/master/watcher) |
|----------|----------------|

A module that subscribes to updates to the queue and executes simulations. Uses RxJS to manage concurrent asynchronous simulations. Simulations are conducted via the [iBioSim API](https://github.com/SynBioHub/Plugin-Download-iBioSim), an interface to a series of Java-based genetic system simulators.

<img src="https://user-images.githubusercontent.com/11147616/166837633-e43f877a-c956-4360-b147-87341e561459.png" width="23%"></img> <img src="https://user-images.githubusercontent.com/11147616/166892915-96445370-5cb7-4068-948f-10d33f771eee.png" width="23%"></img> <img src="https://user-images.githubusercontent.com/11147616/166837855-75b0e017-a97b-413d-a6ec-ba9d4940e576.png" width="23%"></img> 

&nbsp;

| **SBOL Canvas** | [canvas/](https://github.com/zachsents/SBOL-Home/tree/master/canvas) |
|----------|----------------|

A graph-based designer developed by [Logan Terry](https://github.com/Randoom97) and currently maintained by [Zach Sents](https://github.com/zachsents). Utilizes an Angular frontend and a Java backend. Functions as a self-contained app, but the version in this repository contains additional features to allow it to function as an embedded component in an iFrame. The original project is [here](https://github.com/SynBioDex/SBOLCanvas).

<img src="https://user-images.githubusercontent.com/11147616/166891435-0236d3ec-3113-4aba-928c-3fc53602234d.png" width="23%"></img> <img src="https://user-images.githubusercontent.com/11147616/166891584-992be369-dabb-4a84-9d40-1f0807e11af7.png" width="23%"></img> 



## Demo

![image](https://user-images.githubusercontent.com/11147616/166893230-a2838a3e-1604-4afc-bae1-ce012cf7ee23.png)

The embedded SBOL Canvas designer.

&nbsp;

![image](https://user-images.githubusercontent.com/11147616/166893475-c32ad714-6953-475c-94c2-8b59b26d352c.png)

The simulator.
## Run Locally

This is a monorepo of several services combined using Docker Compose.

Clone the project

```bash
  git clone https://github.com/zachsents/SBOL-Home
```

Go to the project directory

```bash
  cd SBOL-Home
```

Build the images

```bash
  docker-compose build
```

Start the services

```bash
  docker-compose up
```

The app will be exposed on at http://localhost:3001.
