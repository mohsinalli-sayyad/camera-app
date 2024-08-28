import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  CameraType,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import VideoPreviewSection from "@/components/VideoPreviewSection";

const video = () => {
  const [hasAudioPermission, setHasAudioPermission] =
    useMicrophonePermissions();
  const [hasCameraPermission, setHasCameraPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const [record, setRecord] = useState(null);
  const [facing, setFacing] = useState<CameraType>("back");

  //toggle Camera
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };
  //start recording
  const takeVideo = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.recordAsync();
      setRecord(data.uri);
    }
  };
  //Stop recording
  const stopVideo = async () => {
    if (cameraRef.current) {
      await cameraRef.current.stopRecording();
    }
    console.log("stop");
  };
  // Camera permissions are still loading.
  if (!hasCameraPermission || !hasAudioPermission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (!hasAudioPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button
          onPress={() => {
            setHasAudioPermission();
          }}
          title="grant Audio permission"
        />
      </View>
    );
  }

  if (!hasCameraPermission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button
          onPress={() => {
            setHasCameraPermission();
          }}
          title="grant Camera permission"
        />
      </View>
    );
  }

  const handleRetakeVideo = () => setRecord(null);

  if (record) {
    return (
      <VideoPreviewSection
        record={record}
        handleRetakeVideo={handleRetakeVideo}
      />
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
        mode="video"
        videoQuality={"1080p"}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <AntDesign name="retweet" size={30} color="black" />
            <Text>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={takeVideo}
          >
            <Ionicons name="play-circle-outline" size={30} color="black" />
            <Text>Take video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button]}
            onPress={stopVideo}
          >
            <Ionicons name="stop-circle-outline" size={30} color="black" />
            <Text>Stop Video</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

export default video;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginVertical: 64,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    padding:8
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
