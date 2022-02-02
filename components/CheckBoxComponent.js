import BouncyCheckbox from 'react-native-bouncy-checkbox';

const CheckBoxComponent = ({title, checkedList, slug, handleChangeValues}) => {

    return (
        <BouncyCheckbox
            text={title}
            textStyle={{
                textDecorationLine: "none",
                fontWeight:`${checkedList[slug] === true ? "bold" : "normal" }`,
                color:`${checkedList[slug] === true ? "green" : "black" }`,
                fontSize:20,
                marginTop:5,
            }} 
            fillColor="green" 
            iconStyle={{ borderColor: "black" }}
            onPress={(isChecked)=> handleChangeValues(isChecked, slug)}
        />
    );
};

export default CheckBoxComponent;
