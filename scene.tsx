import * as DCL from 'decentraland-api'
import { createElement } from 'decentraland-api'
import { Vector3, Quaternion} from "babylonjs";

const networkHz = 6 // for timing|timer
const interval = 1000 / networkHz // for timing|timer
const BABYLON = require('babylonjs'); // for babylon.js

export interface IState {
	sphereposition:Vector3,
	sphererotation: Quaternion,
	sphereradius: number,
	wall1PositionX: number,
	wall1PositionY: number,
	wall1PositionZ: number,
	wall1height: number,
	wall1width: number,
	wall1depth: number
}

export default class BabylonPhysics extends DCL.ScriptableScene {

state: IState = {
		sphereposition: new Vector3(4, 5, 0),
		sphererotation: new Quaternion(0, 0, 0, 0),
		sphereradius: 1.4,
		wall1PositionX: -2,
		wall1PositionY: 5,
		wall1PositionZ: 0,
		wall1height: 10,
		wall1width: 0.5,
		wall1depth: 9
};

sceneDidMount() {

		// babylon.js

		// set the radius of the sphere
		var sphere_radius = this.state.sphereradius;

		// variables for the glass-wall
		var wall1_PositionX = this.state.wall1PositionX;
		var wall1_PositionY = this.state.wall1PositionY;
		var wall1_PositionZ = this.state.wall1PositionZ;
		var wall1_height = this.state.wall1height;
		var wall1_width = this.state.wall1width;
		var wall1_depth = this.state.wall1depth;

		// babylon.js-action

		var createScene = function () {

			var scene = new BABYLON.Scene(engine);

            // This creates and positions a free camera (non-mesh)
            var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
            // This targets the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());

			// Defining the jumping sphere, setting start-position
			var sphere = BABYLON.Mesh.CreateSphere("sphere", 16, sphere_radius, scene); sphere.position.x = 4; sphere.position.y = 5; sphere.position.z = 0;

			// Defining the green ground
			var ground = BABYLON.Mesh.CreateGround("ground2", 20, 20, 2, scene); ground.position.y = 0; ground.position.z = 0; 

			// Defining the wall
			var wall1 = BABYLON.MeshBuilder.CreateBox("wall1", {height: wall1_height, width: wall1_width, depth: wall1_depth}, scene);
			// Positioning of the wall
			wall1.position.x = wall1_PositionX;
			wall1.position.y = wall1_PositionY;
			wall1.position.z = wall1_PositionZ; 

			// Starting the Babylon.js-physics

			scene.enablePhysics();

			// Setting the sphere as the moving part
			sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 0.6, restitution: 0.9 }, scene);
			// Applying the LinearVelocity at start
        	sphere.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(-2, 0, 1));
			// Applying the AngularVelocity at start
			sphere.physicsImpostor.setAngularVelocity(new BABYLON.Quaternion(-5, 0, 0, 0));

			// Setting the ground as a fixed part
			ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

			// Setting the wall as a fixed part
			wall1.physicsImpostor = new BABYLON.PhysicsImpostor(wall1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);

			return scene;

		};

			var engine = new BABYLON.NullEngine();
	        var scene1 = createScene();
 
		engine.runRenderLoop(function () {

            if (scene1) {
				scene1.render();
            }
        });

		// Checking the position and rotation of the sphere and forwarding the value
		setInterval(() => {
			const ballposition = scene1.meshes[0].position; this.setState({sphereposition: ballposition});
			const ballrotation = scene1.meshes[0].rotationQuaternion; this.setState({sphererotation: ballrotation});
		}, interval);

		// Applying a new Impulse by clicking on the sphere
		this.eventSubscriber.on("sphere_click", () => {
				scene1.meshes[0].physicsImpostor.applyImpulse(new BABYLON.Vector3(-1.5, 6, 1), scene1.meshes[0].getAbsolutePosition());
		});

	}

  sceneWillUnmount() {
  	}

  async render() {

    return (
      <scene>
		<material id="ball" metallic={1} alpha={1} albedoTexture={'/textures/beachball.jpg'} alphaTexture={'/textures/beachball.jpg'} />
		<material id="glasseffect" metallic={1} alpha={0.3} albedoTexture={'/textures/glass.jpg'} alphaTexture={'/textures/glass.jpg'} />

		<sphere id="sphere" position={this.state.sphereposition} rotation={this.state.sphererotation.toEulerAngles().scale(180 / Math.PI)} scale={this.state.sphereradius} transition={{position: { duration: interval, timing: "linear" }, rotation: { duration: interval, timing: "linear" }}} material="#ball" withCollisions={true} />
 		<box id="wall1" position={{ x: this.state.wall1PositionX, y: this.state.wall1PositionY, z: this.state.wall1PositionZ }} rotation={{ x: 0, y: 0, z: 0 }} scale={{ x: this.state.wall1width, y: this.state.wall1height, z: this.state.wall1depth }} color="#bdbdbd" material="#glasseffect" withCollisions={true} />
 		<plane id="ground" position={{ x: 0, y: 0.01, z: 0 }} rotation={{ x: 90, y: 0, z: 0 }} scale={{ x: 20, y: 20, z: 1 }} color="#90EE90" />

      </scene>
    )
  };
}