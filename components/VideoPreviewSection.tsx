import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { AVPlaybackStatus, ResizeMode, Video, VideoState } from "expo-av";
import { Fontisto } from "@expo/vector-icons";

const VideoPreviewSection = ({
  record,
  handleRetakeVideo,
}: {
  record: Video;
  handleRetakeVideo: () => void;
}) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState<any>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Video
          style={styles.videoPreviewConatiner}
          ref={videoRef}
          source={{
            uri: `${
              record
                ? record
                : "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
            }`,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRetakeVideo}>
          <Fontisto name="trash" size={36} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VideoPreviewSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  box: {
    borderRadius: 15,
    padding: 1,
    width: "95%",
    backgroundColor: "darkgray",
    justifyContent: "center",
    alignItems: "center",
  },
  videoPreviewConatiner: {
    width: "95%",
    height: "85%",
    borderRadius: 15,
  },
  buttonContainer: {
    marginTop: "4%",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "gray",
    borderRadius: 25,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
