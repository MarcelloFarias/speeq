import SoundItem from "@/components/SoundItem";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  useWindowDimensions,
  View,
  BackHandler,
} from "react-native";
import { theme } from "@/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "@/components/Button";
import { useLayoutEffect, useRef, useState } from "react";
import Input from "@/components/Input";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ISound } from "@/src/interfaces/interfaces";
import { router } from "expo-router";

const onboardingImage = require("@/assets/images/onboarding.png");
const voiceAssistantImage = require("@/assets/images/voice-assistant.png");

function Onboarding() {
  const flatListRef = useRef<FlatList>(null);
  const indexRef = useRef(0);
  const { width } = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [voiceOverInputValue, setVoiceOverInputValue] =
    useState("Olá, boas vindas");

  const onBoardingData: any[] = [
    {
      image: onboardingImage,
      title: "Boas Vindas ao Speeq",
      subtitle: "Seu assistente de voz.",
    },
    {
      component: (
        <SoundItem
          sound={{
            iconFamily: "AntDesign",
            iconName: "sound",
            soundName: "Boas vindas",
          }}
        />
      ),
      title: "O seu dispositivo fala o que você desejar",
      subtitle: "Faça o teste! Clique no card abaixo:",
    },
    {
      title: "Qualquer texto vira fala",
      subtitle: "Com o Speeq também é possível transformar textos em fala!",
    },
    {
      image: voiceAssistantImage,
      title: "Tudo pronto",
      subtitle: "Agora você pode explorar as funcionalidades do Speeq!",
    },
  ];

  const defaultSounds: ISound[] = [
    {
      iconName: "like1",
      iconFamily: "AntDesign",
      soundName: "Sim",
    },
    {
      iconName: "dislike1",
      iconFamily: "AntDesign",
      soundName: "Não",
    },
    {
      iconName: "hand-holding",
      iconFamily: "FontAwesome6",
      soundName: "Por Favor",
    },
    {
      iconName: "handshake",
      iconFamily: "FontAwesome6",
      soundName: "Obrigado",
    },
  ];

  const onScroll = (event: any) => {
    const index = event.nativeEvent.contentOffset.x / width;
    const roundedIndex = Math.round(index);
    indexRef.current = roundedIndex;
    setCurrentPage(roundedIndex);
  };

  const OnBoardingItem = ({ item }: any) => {
    if (item.image) {
      return (
        <View
          style={{
            width: width,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ maxWidth: 260, maxHeight: 260, alignSelf: "center" }}
            source={item.image}
          />
          <Text
            style={{
              marginLeft: 16,
              fontSize: 24,
              color: theme.colors[800],
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              marginLeft: 16,
              fontSize: 16,
              marginTop: 8,
              color: theme.colors[950],
            }}
          >
            {item.subtitle}
          </Text>
        </View>
      );
    }

    if (item.component) {
      return (
        <View
          style={{
            width: width,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              marginLeft: 16,
              fontSize: 24,
              color: theme.colors[800],
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              marginLeft: 16,
              fontSize: 16,
              marginTop: 8,
              color: theme.colors[950],
            }}
          >
            {item.subtitle}
          </Text>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            {item.component}
          </View>
        </View>
      );
    }
  };

  const ListPagination = () => {
    return (
      <View
        style={{
          width: width,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 64,
        }}
      >
        {onBoardingData.map((item: any, index: any) => {
          return (
            <View
              key={item.title}
              style={{
                width: currentPage == index ? 16 : 12,
                height: currentPage == index ? 16 : 12,
                backgroundColor:
                  currentPage == index ? theme.colors[300] : theme.colors[100],
                borderRadius: 50,
                marginHorizontal: 8,
              }}
            ></View>
          );
        })}
      </View>
    );
  };

  const blockHardwareBackButton = () => {
    const onBackPress = () => {
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  };

  useLayoutEffect(() => {
    blockHardwareBackButton();
  }, []);

  const goToHomeScreen = async () => {
    await AsyncStorage.setItem(
      "@configs",
      JSON.stringify({ isFirstTimeOpen: false })
    );

    await AsyncStorage.setItem("@sounds", JSON.stringify(defaultSounds));

    router.navigate("/");
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={onBoardingData}
        keyExtractor={(item: any) => item.title}
        renderItem={({ item }: any) =>
          !item.image && !item.component ? (
            <View
              style={{
                width: width,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  marginLeft: 16,
                  fontSize: 24,
                  color: theme.colors[800],
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  marginLeft: 16,
                  fontSize: 16,
                  marginTop: 8,
                  color: theme.colors[950],
                }}
              >
                {item.subtitle}
              </Text>
              <View style={{ width: "100%" }}>
                <Input
                  label="Digite algum texto"
                  onChangeText={(text: string) => setVoiceOverInputValue(text)}
                  value={voiceOverInputValue}
                  editable={false}
                  marginTop={32}
                  placeholder="Digite o que deseja transformar em fala..."
                />

                <Button
                  onPress={() => {
                    Speech.speak(voiceOverInputValue);
                  }}
                  marginTop={16}
                >
                  <AntDesign color="#fff" name="sound" size={24} />
                </Button>
              </View>
            </View>
          ) : (
            <OnBoardingItem item={item} />
          )
        }
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onScroll={onScroll}
        initialNumToRender={0}
      />

      <ListPagination />

      {currentPage === onBoardingData.length - 1 && (
        <Button
          onPress={goToHomeScreen}
          marginBottom={16}
          text="Vamos Começar"
        />
      )}
    </SafeAreaView>
  );
}

export default Onboarding;
