# HarperDB Coding Challenge

The objective of this challenge is to demonstrate familiarity with some of the core concepts at use in HarperDB, while allowing you the freedom to achieve the outlined tasks in any way you choose. 

## Getting Started
***

We've included 3 dependencies in this project:

- `pm2` - a process manager for NodeJS that we use in HarperDB.
- `fastify` - the web server technology we use in HarperDB
- `axios` - a popular http request library you can use to hit the HarperDB API.

**You shouldn't need any other dependencies to complete this challenge**

To get started, clone this repo and install the dependencies.

## Task #1: Explore `index.js`
***

The scripts where you place your logic are spun up using `pm2`. You can find the logic for this in the root-level `index.js` file. Be prepared to explain what this file does. If you choose to modify it, that's fine- just be prepared to tell us how and why you did so.


## Task #2: Create a Fastify Server
***

In `modules/fastify/index.js`, create a fastify server with a single POST route, listening at `http://localhost:3000`. 

It should accept a json body, which should contain a single key: `grid_size`. You can use Fastify's route: `schema` attribute to validate inbound data.

Your endpoint's handler should use the inbound `grid_size` value to create an array of arrays that meets the following requirements:

- the main array should have `grid_size` rows
- each subarray should each have `grid_size` elements
- the numbers contained within each subarray should be sorted in descending order
- the first number in any subarray should be **smaller than or equal to** the smallest number in the array before it

As an example, for a `grid_size` of 3, the array of arrays would look something like this:

```
[
    [92, 87, 54],
    [44, 41, 39], 
    [27,20, 10]
]
```

## Task #3: Set up Interprocess Communication
***

Once you've created your `array_of_arrays` in your route's handler, use pm2's `sendDataToProcessId` method to broadcast a message to the process you'll design in step 2 below. The message should have the following shape:

```
{
    grid_size: [int],
    array_of_arrays: [your-generated-array-of-arrays]
}
```

## Task #4: Insert the result into HarperDB
***

In `modules/harperdb/index.js`, write a script that listens for a message from pm2's `sendDataToProcessId` method, and inserts the payload of that message into HarperDB. Use schema `dev` and table `test`.

## Task #5: Add a unit test
***

We'd love to see you add at least one unit test. Some suggestions:

- your `array_of_arrays` generator method
- that your Fastify server starts up
- your HarperDB insert method functions as expected
