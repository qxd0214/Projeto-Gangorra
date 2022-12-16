import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px 20px 180px;
`

export const Title = styled.Text`
  font-size: 24px;
  color: #000;
  font-weight: bold;
  text-align: center;
`

export const Logo = styled.Image`
  margin-top: 60px;
`

export const Button = styled.TouchableOpacity`
  background-color: #4361EE;
  width: 100%;
  padding: 12px 14px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`

export const ButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`