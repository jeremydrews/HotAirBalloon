import * as THREE from "three"
import {OrbitControls} from "./three.js-master/examples/jsm/controls/OrbitControls.js"
import {GLTFLoader} from "./three.js-master/examples/jsm/loaders/GLTFLoader.js"
import {TextGeometry} from "./three.js-master/examples/jsm/geometries/TextGeometry.js"
import {FontLoader} from "./three.js-master/examples/jsm/loaders/FontLoader.js"

let scene, camera, renderer, camera2, cameraAwal, controls

const initial = () => {
    scene = new THREE.Scene()
    let fov = 50
    let aspect = window.innerWidth/window.innerHeight
    let near = 1
    let far = 5000
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(-180, 30, 0)
    camera.lookAt(0, 30, 0)
    cameraAwal = camera
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.append(renderer.domElement)
    renderer.shadowMap.enabled = true
    //free camera
    camera2 = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera2.position.set(-200, 50, 0)
    controls = new OrbitControls(camera2, renderer.domElement)
}

let cameraChanger = event => {
    let keyCode = event.keyCode
    console.log(keyCode);
    if(keyCode == 32) {
        if(cameraAwal == camera) cameraAwal = camera2;
        else cameraAwal = camera;
    }
}

let listener = () => {
    document.addEventListener("keydown", cameraChanger)
}

// ------------LIGHT START------------------------------------------
const createAmbientLight = () => {
    const ambient = new THREE.AmbientLight("#404040")
    scene.add(ambient)
}

const spotlight1 = () => {
    const spotlight = new THREE.SpotLight("#FFFFFF")
    spotlight.intensity = 1
    spotlight.position.set(-100, 0, 100)
    spotlight.lookAt(0,50,0)
    spotlight.distance = 300
    spotlight.castShadow = true
    scene.add(spotlight)
}

const spotlight2 = () => {
    const spotlight = new THREE.SpotLight("#FFFFFF")
    spotlight.intensity = 1
    spotlight.position.set(-100, 0, -100)
    spotlight.lookAt(0,50,0)
    spotlight.distance = 300
    spotlight.castShadow = true
    scene.add(spotlight)
}

const spotlight3 = () => {
    const spotlight = new THREE.SpotLight("#FFFFFF")
    spotlight.intensity = 0.5
    spotlight.position.set(0, 200, 0)
    spotlight.lookAt(0,0,0)
    spotlight.distance = 300
    spotlight.angle = Math.PI/4 + Math.PI/6
    spotlight.castShadow = true
    scene.add(spotlight)
}
// -----LIGHT END--------------------------------------------------

//-----GROUND START--------------------------------------------------------------------------
const createGround = () => {
    const groundGeometry = new THREE.PlaneGeometry(1000, 1000)
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: "#8c3b0c"
    })
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
    groundMesh.position.set(0, -5, 0)
    groundMesh.rotation.x = -Math.PI/2
    groundMesh.receiveShadow = true
    scene.add(groundMesh)
}
//-----GROUND END------------------------------------------------------------------------------

//-----3D INSERT START-----------------------------------------------------------------------
const load3D = () => {
    const loader = new GLTFLoader().load('./assets/model/scene.gltf', gltf => {
        const balloon = gltf.scene
        balloon.position.set(0,0,0)
        balloon.scale.set(0.1,0.1,0.1)
        scene.add(balloon)
    })
}

//-----3D INSERT END--------------------------------------------------------------------------

//-----CRATE START------------------------------------------------------------------------------
const crateA1 = () => {
    const crateGeometry = new THREE.BoxGeometry(10,10,10)
    const crateTexture = new THREE.TextureLoader().load('./assets/texture/crate1.jpeg')
    const crateMaterial = new THREE.MeshPhongMaterial({
        map: crateTexture
    })
    const crateMesh = new THREE.Mesh(crateGeometry, crateMaterial)
    crateMesh.position.set(-30, 0, -40)
    crateMesh.rotation.set(0,0,0)
    crateMesh.castShadow = true
    crateMesh.receiveShadow = true
    scene.add(crateMesh)
}

const crateA2 = () => {
    const crateGeometry = new THREE.BoxGeometry(5,5,5)
    const crateTexture = new THREE.TextureLoader().load('./assets/texture/crate1.jpeg')
    const crateMaterial = new THREE.MeshPhongMaterial({
        map: crateTexture
    })
    const crateMesh = new THREE.Mesh(crateGeometry, crateMaterial)
    crateMesh.position.set(-30, -2, -48)
    crateMesh.rotation.x = Math.PI/6
    crateMesh.castShadow = true
    crateMesh.receiveShadow = true
    scene.add(crateMesh)
}

const crateA3 = () => {
    const crateGeometry = new THREE.BoxGeometry(10,15,10)
    const crateTexture = new THREE.TextureLoader().load('./assets/texture/crate1.jpeg')
    const crateMaterial = new THREE.MeshPhongMaterial({
        map: crateTexture
    })
    const crateMesh = new THREE.Mesh(crateGeometry, crateMaterial)
    crateMesh.position.set(-40, 2.5, 30)
    crateMesh.rotation.y = -Math.PI/4
    crateMesh.castShadow = true
    crateMesh.receiveShadow = true
    scene.add(crateMesh)
}

const crateB1 = () => {
    const crateGeometry = new THREE.BoxGeometry(20,20,20)
    const crateTexture = new THREE.TextureLoader().load('./assets/texture/crate2.jpeg')
    const crateMaterial = new THREE.MeshPhongMaterial({
        map: crateTexture
    })
    const crateMesh = new THREE.Mesh(crateGeometry, crateMaterial)
    crateMesh.position.set(30, 5, 40)
    crateMesh.rotation.y = Math.PI/3
    scene.add(crateMesh)
}

const crateB2 = () => {
    const crateGeometry = new THREE.BoxGeometry(40,15,30)
    const crateTexture = new THREE.TextureLoader().load('./assets/texture/crate2.jpeg')
    const crateMaterial = new THREE.MeshPhongMaterial({
        map: crateTexture
    })
    const crateMesh = new THREE.Mesh(crateGeometry, crateMaterial)
    crateMesh.position.set(30, 2.5, -60)
    crateMesh.rotation.y = -Math.PI/6
    scene.add(crateMesh)
}
//-----CRATE END------------------------------------------------------------------------------

//-----TIRE START-------------------------------------------------------------------------------
const tire1 = () => {
    const tireGeometry = new THREE.TorusGeometry(5,2.5,16,100)
    const tireMaterial = new THREE.MeshStandardMaterial({
        color: "#3e444c"
    })
    const tireMesh = new THREE.Mesh(tireGeometry, tireMaterial)
    tireMesh.position.set(-70, -5, 0)
    tireMesh.rotation.y = Math.PI/2
    tireMesh.castShadow = true
    tireMesh.receiveShadow = true
    scene.add(tireMesh)
}

const tire2 = () => {
    const tireGeometry = new THREE.TorusGeometry(5,2.5,16,100)
    const tireMaterial = new THREE.MeshStandardMaterial({
        color: "#3e444c"
    })
    const tireMesh = new THREE.Mesh(tireGeometry, tireMaterial)
    tireMesh.position.set(-65, -5, 20)
    tireMesh.rotation.y = Math.PI/2 + (Math.PI/9*1)
    tireMesh.castShadow = true
    tireMesh.receiveShadow = true
    scene.add(tireMesh)
}

const tire3 = () => {
    const tireGeometry = new THREE.TorusGeometry(5,2.5,16,100)
    const tireMaterial = new THREE.MeshStandardMaterial({
        color: "#3e444c"
    })
    const tireMesh = new THREE.Mesh(tireGeometry, tireMaterial)
    tireMesh.position.set(-65, -5, -20)
    tireMesh.rotation.y = -(Math.PI/2 + (Math.PI/9*1))
    tireMesh.castShadow = true
    tireMesh.receiveShadow = true
    scene.add(tireMesh)
}

const tire4 = () => {
    const tireGeometry = new THREE.TorusGeometry(5,2.5,16,100)
    const tireMaterial = new THREE.MeshStandardMaterial({
        color: "#3e444c"
    })
    const tireMesh = new THREE.Mesh(tireGeometry, tireMaterial)
    tireMesh.position.set(-55, -5, 40)
    tireMesh.rotation.y = Math.PI/2 + (Math.PI/9*2)
    tireMesh.castShadow = true
    tireMesh.receiveShadow = true
    scene.add(tireMesh)
}

const tire5 = () => {
    const tireGeometry = new THREE.TorusGeometry(5,2.5,16,100)
    const tireMaterial = new THREE.MeshStandardMaterial({
        color: "#3e444c"
    })
    const tireMesh = new THREE.Mesh(tireGeometry, tireMaterial)
    tireMesh.position.set(-55, -5, -40)
    tireMesh.rotation.y = -(Math.PI/2 + (Math.PI/9*2))
    tireMesh.castShadow = true
    tireMesh.receiveShadow = true
    scene.add(tireMesh)
}
//-----TIRE END---------------------------------------------------------------------------------

//-----POLES START-----------------------------------------------------------------------------
const pole1 = () => {
    const poleGeometry = new THREE.CylinderGeometry(1,1,50,16)
    const poleMaterial = new THREE.MeshPhongMaterial({
        color: "#646FD4"
    })
    const poleMesh = new THREE.Mesh(poleGeometry, poleMaterial)
    poleMesh.position.set(0, 15, 35)
    poleMesh.rotation.x = -Math.PI/6
    poleMesh.castShadow = true
    poleMesh.receiveShadow = true
    scene.add(poleMesh)
}

const pole2 = () => {
    const poleGeometry = new THREE.CylinderGeometry(1,1,50,16)
    const poleMaterial = new THREE.MeshPhongMaterial({
        color: "#646FD4"
    })
    const poleMesh = new THREE.Mesh(poleGeometry, poleMaterial)
    poleMesh.position.set(0, 15, -35)
    poleMesh.rotation.x = Math.PI/6
    poleMesh.castShadow = true
    poleMesh.receiveShadow = true
    scene.add(poleMesh)
}
//-----POLES END----------------------------------------------------------------------------

//-----BUTTON START----------------------------------------------------------
const button1 = () => {
    const buttonGeometry = new THREE.BoxGeometry(10,16.5,14.5)
    const buttonMaterial = new THREE.MeshPhongMaterial({
        color: "#848482"
    })
    const buttonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial)
    buttonMesh.position.set(-43, 3, 65)
    buttonMesh.rotation.y = -Math.PI/6
    buttonMesh.castShadow = true
    buttonMesh.receiveShadow = true
    scene.add(buttonMesh)
}

const button2 = () => {
    const buttonGeometry = new THREE.SphereGeometry(4.5,32,16)
    const buttonMaterial = new THREE.MeshPhongMaterial({
        color: "#dc143c"
    })
    const buttonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial)
    buttonMesh.position.set(-46, 3, 63)
    buttonMesh.castShadow = true
    buttonMesh.receiveShadow = true
    scene.add(buttonMesh)
}
//-----BUTTON END------------------------------------------------------------

//-----TEXT START---------------------------------------------------------------
const createText = () => {
    const textLoader = new FontLoader().load("./three.js-master/examples/fonts/helvetiker_bold.typeface.json", font => {
        const textGeometry = new TextGeometry("Click Me!", {
            font: font,
            size: 7,
            height: 2,
        })
        const textMaterial = new THREE.MeshPhongMaterial({
            color: "#FF5B00",
            specular: "#990000"
            
        })
        const textMesh = new THREE.Mesh(textGeometry, textMaterial)
        textMesh.position.set(-35, 25, 50)
        textMesh.rotation.y = Math.PI*3 + 1
        textMesh.castShadow = true
        textMesh.receiveShadow = true
        scene.add(textMesh)
    })
}

//-----TEXT END-----------------------------------------------------------------

//-----SKYBOX START--------------------------------------------------------------
const createSkybox = () => {
    const array = []
    const textureRight = new THREE.TextureLoader().load('./assets/skybox/dawn_right.png')
    const textureLeft = new THREE.TextureLoader().load('./assets/skybox/dawn_left.png')
    const textureTop = new THREE.TextureLoader().load('./assets/skybox/dawn_top.png')
    const textureBottom = new THREE.TextureLoader().load('./assets/skybox/dawn_bottom.png')
    const textureFront = new THREE.TextureLoader().load('./assets/skybox/dawn_front.png')
    const textureBack = new THREE.TextureLoader().load('./assets/skybox/dawn_back.png')

    array.push(new THREE.MeshBasicMaterial({map: textureRight}))
    array.push(new THREE.MeshBasicMaterial({map: textureLeft}))
    array.push(new THREE.MeshBasicMaterial({map: textureTop}))
    array.push(new THREE.MeshBasicMaterial({map: textureBottom}))
    array.push(new THREE.MeshBasicMaterial({map: textureFront}))
    array.push(new THREE.MeshBasicMaterial({map: textureBack}))

    for(let i = 0; i<6; i++) {
        array[i].side = THREE.BackSide
    }

    const skyboxGeometry = new THREE.BoxGeometry(1000,1000,1000)
    const skyboxMesh = new THREE.Mesh(skyboxGeometry, array)
    scene.add(skyboxMesh)
}

//-----SKYBOX END-----------------------------------------------------------------

let render = () => {
    requestAnimationFrame(render)
    renderer.render(scene, cameraAwal)
}

window.onload = () => {
    initial()
    listener()
    createAmbientLight()
    spotlight1()
    spotlight2()
    spotlight3()
    createGround()
    load3D()
    crateA1()
    crateA2()
    crateA3()
    crateB1()
    crateB2()
    tire1()
    tire2()
    tire3()
    tire4()
    tire5()
    pole1()
    pole2()
    button1()
    button2()
    createText()
    createSkybox()
    render()
}

