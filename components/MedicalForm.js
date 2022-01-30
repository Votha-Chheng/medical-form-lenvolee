import { SafeAreaView, Text, View } from "react-native";

const MedicalForm = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>
          Nom du médecin traitant
        </Text>
      </View>
      <View>
        <Text>
          Date du dernier examen médical (à quelques semaines près) :
        </Text>
      </View>
      
    </SafeAreaView>
  );
}

export default MedicalForm;