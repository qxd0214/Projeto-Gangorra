import styled from 'styled-components/native'

import { ContainerControllerBase, ControllerTextBase } from '../styles'

export const ContainerPIDController = styled(ContainerControllerBase)`
  height: 280px;
`

export const PIDControllerText = styled(ControllerTextBase)``

export const GroupField = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 8px 0;
`

export const Label = styled.Text`
  margin: 18px;
  font-size: 18px;
  font-weight: bold;
  color: #001219;
`

export const Input = styled.TextInput`
  flex: 1;
  background-color: #FFFFFF;
  border-radius: 8px;
  height: 48px;
  font-size: 18px;
  margin-right: 16px;
`

export const ButtonSubmit = styled.TouchableOpacity`
  flex: 1;
  background-color: #52B788;
  padding: 14px 14px;
  border-radius: 8px;

  align-items: center;
  justify-content: center;
`

export const ButtonClear = styled.TouchableOpacity`
  flex: 1;
  background-color: #4361EE;
  align-items: center;
  justify-content: center;

  margin-top: 8px;
  margin-bottom: 8px;

  padding: 14px;
  border-radius: 8px;
`

export const ButtonClearText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`

export const ButtonSubmitText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`
