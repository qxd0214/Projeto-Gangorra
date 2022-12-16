import { ActivityIndicator } from 'react-native'
import Slider from '@react-native-community/slider';
import * as S from './styles'

export function AngleController({
  isFreeMode,
  sliderValue,
  onChangeSliderValue,
  handleAngleControl,
  handleClearAngle,
}) {
  return (
    <S.ContainerAngleController isDisabled={!isFreeMode}>
      <S.AngleControllerText>Angulação</S.AngleControllerText>
      <S.SliderValue>{sliderValue}°</S.SliderValue>
      <Slider
        disabled={!isFreeMode}
        style={{ height: 40 }}
        minimumValue={-14}
        maximumValue={14}
        step={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#0300FF"
        thumbTintColor="#0300FF"
        value={sliderValue}
        onValueChange={onChangeSliderValue}
      />
      <S.AngleRangeBox>
        <S.AngleRangeText>-14°</S.AngleRangeText>
        <S.AngleRangeText>14°</S.AngleRangeText>
      </S.AngleRangeBox>

      <S.ButtonClear
        disabled={!isFreeMode}
        onPress={handleClearAngle}
      >
        <S.ButtonClearText>Limpar</S.ButtonClearText>
      </S.ButtonClear>

      <S.ButtonSubmit
        disabled={!isFreeMode}
        onPress={handleAngleControl}
      >
        <S.ButtonSubmitText>Enviar</S.ButtonSubmitText>
      </S.ButtonSubmit>
    </S.ContainerAngleController>
  )
}