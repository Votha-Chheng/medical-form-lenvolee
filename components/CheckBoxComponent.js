import BouncyCheckbox from 'react-native-bouncy-checkbox';

const CheckBoxComponent = ({title, maladies, handleChangeValues}) => {

    return (
        <BouncyCheckbox
            text={title}
            textStyle={{
                textDecorationLine: "none",
                fontWeight:`${maladies && maladies.includes(title)  ? "bold" : "normal" }`,
                color:`${maladies && maladies.includes(title) ? "green" : "black" }`,
                fontSize:20,
                marginTop:0,
            }}
            style={{marginVertical:5}} 
            fillColor="green" 
            iconStyle={{ borderColor: "black" }}
            onPress={(isChecked)=> handleChangeValues(isChecked, title)}
        />
    );
};

export default CheckBoxComponent;
