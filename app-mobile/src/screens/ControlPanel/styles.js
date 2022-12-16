import styled, { css } from "styled-components/native";

export const Container = styled.ScrollView`
  flex: 1;
`

export const Label = styled.Text`
  margin: 18px;
  font-size: 18px;
  font-weight: bold;
  color: #001219;
`

export const ControllerTextBase = styled.Text`
  font-size: 18px;
  color: #001219;
  text-align: center;
  font-weight: bold;
`

export const ContainerControllerBase = styled.View`
  padding: 18px;
  background-color: #E9ECEF;
  border-radius: 40px;
  margin-top: 24px;

  ${props => props.isDisabled && css`
    opacity: 0.3;
  `}
`

export const ContainerSelectMode = styled.View`
  align-items: center;
  justify-content: center;
`

export const SelectMode = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 18px;
`

export const ModeText = styled.Text`
  font-size: 16px;
  color: #001219;
  font-weight: 700;
  margin: 0 8px;
`