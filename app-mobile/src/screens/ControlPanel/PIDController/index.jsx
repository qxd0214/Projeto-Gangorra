import { ActivityIndicator } from 'react-native'
import * as S from './styles';

export function PIDController({
  isFreeMode,
  pidValue,
  onChangePidValue,
  handlePValueControl,
  handleIValueControl,
  handleDValueControl,
}) {
  return (
    <S.ContainerPIDController isDisabled={!isFreeMode}>
      <S.PIDControllerText>Parâmetros de controle</S.PIDControllerText>

      <S.GroupField>
        <S.Label>Parâmetro P: </S.Label>
        <S.Input
          value={pidValue.kp}
          keyboardType='numeric'
          placeholder='Kp'
          onChangeText={(value) => onChangePidValue(value, 'kp')}
          editable={isFreeMode}
        />
        <S.ButtonSubmit
          disabled={!isFreeMode}
          onPress={handlePValueControl}
        >
          <S.ButtonSubmitText>Enviar</S.ButtonSubmitText>
        </S.ButtonSubmit>
      </S.GroupField>

      <S.GroupField>
        <S.Label>Parâmetro I:  </S.Label>
        <S.Input
          value={pidValue.ki}
          keyboardType='numeric'
          placeholder='Ki'
          onChangeText={(value) => onChangePidValue(value, 'ki')}
          editable={isFreeMode}
        />
        <S.ButtonSubmit
          disabled={!isFreeMode}
          onPress={handleIValueControl}
        >
          <S.ButtonSubmitText>Enviar</S.ButtonSubmitText>
        </S.ButtonSubmit>
      </S.GroupField>

      <S.GroupField>
        <S.Label>Parâmetro D: </S.Label>
        <S.Input
          value={pidValue.kd}
          keyboardType='numeric'
          placeholder='Kd'
          onChangeText={(value) => onChangePidValue(value, 'kd')}
          editable={isFreeMode}
        />
        <S.ButtonSubmit
          disabled={!isFreeMode}
          onPress={handleDValueControl}
        >
          <S.ButtonSubmitText>Enviar</S.ButtonSubmitText>
        </S.ButtonSubmit>
      </S.GroupField>

      {/* <S.ButtonClear
        disabled={!isFreeMode}
        onPress={handleClearPid}
      >
        <S.ButtonClearText>Limpar</S.ButtonClearText>
      </S.ButtonClear> */}
    </S.ContainerPIDController>
  )
}