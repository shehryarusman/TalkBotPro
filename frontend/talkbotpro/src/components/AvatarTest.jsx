import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

// Define mappings between recognized text and facial expressions
    const textToFacialExpression = {
    "hello": "smile",
    "goodbye": "sad",
    // Add more mappings as needed
    };

export function Avatar(props) {
    const { transcript, resetTranscript } = useSpeechRecognition();
    console.log(transcript, "this is what")

  // Function to map recognized text to facial expressions
    const mapTextToFacialExpression = (text) => {
        const words = text.split(" ");
        let facialExpression = "";
        words.forEach(word => {
        if (textToFacialExpression[word]) {
            facialExpression = textToFacialExpression[word];
        }
        });
        return facialExpression;
    };

  // State to track current facial expression
    const [currentFacialExpression, setCurrentFacialExpression] = useState("");

  // Function to update facial expression based on recognized text
    const updateFacialExpression = (text) => {
        const facialExpression = mapTextToFacialExpression(text);
        setCurrentFacialExpression(facialExpression);
    };

  // Update facial expression when transcript changes
    useEffect(() => {
        if (transcript !== "") {
        updateFacialExpression(transcript);
        resetTranscript(); // Reset transcript after processing
        }
    }, [transcript, resetTranscript]);

    // Load 3D model and animations
    const { nodes, materials } = useGLTF("/models/6621fd86fc348fb637d2ad0a.glb");
    const { animations: idleAnimation } = useFBX("/animations/Idle.fbx");
    const { animations: angryAnimation } = useFBX("/animations/Angry_Gesture.fbx");
    const { animations: greetingAnimation } = useFBX("/animations/Standing_Greeting.fbx");

    idleAnimation[0].name = "Idle";
    angryAnimation[0].name = "Angry";
    greetingAnimation[0].name = "Greeting";

  // Define ref for the group
    const group = useRef();
    
    // Initialize animations
    const { actions } = useAnimations(
        [idleAnimation[0], greetingAnimation[0], idleAnimation[0]],
        group
    );

  // Update animation based on current facial expression
    useEffect(() => {
        if (currentFacialExpression === "smile") {
        actions["Smile"].reset().fadeIn(0.5).play();
        } else if (currentFacialExpression === "sad") {
        actions["Sad"].reset().fadeIn(0.5).play();
        } else {
        actions["Idle"].reset().fadeIn(0.5).play();
        }
    }, [currentFacialExpression, actions]);

    // Update facial look at camera
    useFrame((state) => {
        group.current.getObjectByName("Head").lookAt(state.camera.position);
    });

  // Return JSX
    return (

        <group {...props} dispose={null} ref={group}>
        <primitive object={nodes.Hips} />
        <skinnedMesh
            geometry={nodes.Wolf3D_Body.geometry}
            material={materials.Wolf3D_Body}
            skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
            geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
            material={materials.Wolf3D_Outfit_Bottom}
            skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
            geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
            material={materials.Wolf3D_Outfit_Footwear}
            skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
            geometry={nodes.Wolf3D_Outfit_Top.geometry}
            material={materials.Wolf3D_Outfit_Top}
            skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
        <skinnedMesh
            geometry={nodes.Wolf3D_Hair.geometry}
            material={materials.Wolf3D_Hair}
            skeleton={nodes.Wolf3D_Hair.skeleton}
        />
        <skinnedMesh
            name="EyeLeft"
            geometry={nodes.EyeLeft.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.EyeLeft.skeleton}
            morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <skinnedMesh
            name="EyeRight"
            geometry={nodes.EyeRight.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.EyeRight.skeleton}
            morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
        <skinnedMesh
            name="Wolf3D_Head"
            geometry={nodes.Wolf3D_Head.geometry}
            material={materials.Wolf3D_Skin}
            skeleton={nodes.Wolf3D_Head.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
        <skinnedMesh
            name="Wolf3D_Teeth"
            geometry={nodes.Wolf3D_Teeth.geometry}
            material={materials.Wolf3D_Teeth}
            skeleton={nodes.Wolf3D_Teeth.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
        </group>
    );
    }

useGLTF.preload("/models/6621fd86fc348fb637d2ad0a.glb");




