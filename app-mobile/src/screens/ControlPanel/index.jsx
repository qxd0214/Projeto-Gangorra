import { useEffect, useState } from 'react'
import { showMessage } from "react-native-flash-message";
import { Switch } from 'react-native';

import { PIDController } from './PIDController';
import { AngleController } from './AngleController';
import * as S from './styles'
import { useBLE } from '../../hooks/useBLE';

const ACCELEROMETER_SENSOR_ID = '0'
const ULTRASONIC_SENSOR_ID = '1'
const FREE_MODE_ID = '2'
const DEFAULT_MODE_ID = '3'

export function ControlPanel({ navigation }) {
  const {
    writeCharacteristicOfPControlValue,
    writeCharacteristicOfIControlValue,
    writeCharacteristicOfDControlValue,
    writeCharacteristicAngleControlValue,
    writeCharacteristicSelectModeAndSensorValue,
    isConnected,
  } = useBLE()


  const [isFreeMode, setIsFreeMode] = useState(true);
  const [isAccelerometerSensor, setIsAccelerometerSensor] = useState(true);
  const [isFirstRender, seIsFirstRender] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [pidValue, setPidValue] = useState({
    kp: 0,
    ki: 0,
    kd: 0,
  });

  useEffect(() => {
    if (isFreeMode) {
      showMessage({
        message: "Modo livre selecionado!",
        description: "Agora você pode controlar os ganhos do controlador PID e o ângulo de inclinação.",
        duration: 5000,
        type: 'success'
      });
    } else if (!isFreeMode && isFirstRender) {
      showMessage({
        message: "Modo padrão selecionado!",
        duration: 3000,
        type: 'success'
      });
    } else {
      seIsFirstRender(true);
    }

  }, [isFreeMode]);

  useEffect(() => {
    if (isAccelerometerSensor) {
      showMessage({
        message: "Acelerômetro selecionado!",
        description: "Agora o cálculo do ângulo de inclinação será feito a partir do acelerômetro.",
        duration: 5000,
        type: 'success'
      });
    } else if (!isAccelerometerSensor && isFirstRender) {
      showMessage({
        message: "Ultrassônico selecionado!",
        duration: 3000,
        type: 'success'
      });
    } else {
      seIsFirstRender(true);
    }

  }, [isFreeMode]);

  useEffect(() => {
    if(!isConnected) navigation.navigate('Home');
  },[isConnected])

  async function handleSelectSensor(){
    try {

      let isSuccess;

      if(isAccelerometer){
        isSuccess = await writeCharacteristicSelectModeAndSensorValue(ULTRASONIC_SENSOR_ID);
      }else {
        isSuccess = await writeCharacteristicSelectModeAndSensorValue(ACCELEROMETER_SENSOR_ID);
      }

      if (isSuccess) {
        setIsAccelerometerSensor(prevState => !prevState);
        showMessage({
          message: "Sensor alterado com sucesso!",
          duration: 3000,
          type: 'success'
        });
      } else {
        showMessage({
          message: "Erro ao alterar o sensor!",
          duration: 3000,
          type: 'danger'
        });
      }
    } catch (error) {
      showMessage({
        message: "Erro ao alterar o sensor! " + error.message,
        duration: 3000,
        type: 'danger'
      });
    }
  }

  /**
   * Select mode function
   */

  async function handleSelectMode(){
    try {

      let isSuccess;

      if(isFreeMode){
        isSuccess = await writeCharacteristicSelectModeAndSensorValue(DEFAULT_MODE_ID);
      }else {
        isSuccess = await writeCharacteristicSelectModeAndSensorValue(FREE_MODE_ID);
      }

      if (isSuccess) {
        setIsFreeMode(prevState => !prevState);
        showMessage({
          message: "Modo selecionado com sucesso!",
          duration: 3000,
          type: 'success'
        });
      } else {
        showMessage({
          message: "Erro ao selecionar o modo!",
          duration: 3000,
          type: 'danger'
        });
      }
    } catch (error) {
      showMessage({
        message: "Erro ao selecionar o modo! " + error.message,
        duration: 3000,
        type: 'danger'
      });
    }
  }

  /**
   * PID section
   */

  function handleClearPid() {
    setPidValue({
      kp: 0,
      ki: 0,
      kd: 0,
    });
  }

  function onChangePidValue(value, name) {
    setPidValue({
      ...pidValue,
      [name]: value,
    })
  }

  async function handlePValueControl() {
    try {
      const isSuccess = await writeCharacteristicOfPControlValue(pidValue.kp.toString());

      if (isSuccess) {
        showMessage({
          message: "Valor do ganho P enviado com sucesso!",
          duration: 3000,
          type: 'success'
        });
      } else {
        showMessage({
          message: "Erro ao enviar o valor do ganho P!",
          duration: 3000,
          type: 'danger'
        });
      }
    } catch (error) {
      showMessage({
        message: "Erro ao enviar valor do ganho P! " + error.message,
        duration: 3000,
        type: 'danger'
      });
    }
  }

  async function handleIValueControl() {
    try {
      const isSuccess = await writeCharacteristicOfIControlValue(pidValue.ki.toString());

      if (isSuccess) {
        showMessage({
          message: "Valor do ganho I enviado com sucesso!",
          duration: 3000,
          type: 'success'
        });
      } else {
        showMessage({
          message: "Erro ao enviar o valor do ganho I!",
          duration: 3000,
          type: 'danger'
        });
      }
    } catch (error) {
      showMessage({
        message: "Erro ao enviar valor do ganho I! " + error.message,
        duration: 3000,
        type: 'danger'
      });
    }
  }

  async function handleDValueControl() {
    try {
      const isSuccess = await writeCharacteristicOfDControlValue(pidValue.kd.toString());

      if (isSuccess) {
        showMessage({
          message: "Valor do ganho D enviado com sucesso!",
          duration: 3000,
          type: 'success'
        });
      } else {
        showMessage({
          message: "Erro ao enviar o valor do ganho D!",
          duration: 3000,
          type: 'danger'
        });
      }
    } catch (error) {
      showMessage({
        message: "Erro ao enviar valor do ganho D! " + error.message,
        duration: 3000,
        type: 'danger'
      });
    }
  }

  /**
   * Angle section
   */

  function handleClearAngle() {
    setSliderValue(0);
  }

  function onChangeSliderValue(value) {
    setSliderValue(value);
  }

  async function handleAngleControl() {
    try {

      const isSuccess = await writeCharacteristicAngleControlValue(sliderValue.toString());

      if (isSuccess) {
        showMessage({
          message: "Valor do ângulo enviado com sucesso!",
          duration: 3000,
          type: 'success'
        });
      } else {
        showMessage({
          message: "Erro ao enviar valor do ângulo!",
          duration: 3000,
          type: 'danger'
        });
      }


    } catch (error) {
      showMessage({
        message: "Erro ao enviar valor do ângulo! " + error.message,
        duration: 3000,
        type: 'danger'
      });
    }
  }

  return (
    <S.Container>
      <S.ContainerSelectMode>
        <S.Label>Selecione o modo de operação</S.Label>
        <S.SelectMode>
          <S.ModeText>Padrão</S.ModeText>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isFreeMode ? "#4361EE" : "#f4f3f4"}
            onValueChange={handleSelectMode}
            value={isFreeMode}
          />
          <S.ModeText>Livre</S.ModeText>
        </S.SelectMode>
        <S.Label>Selecione o sensor que deseja utilizar</S.Label>
        <S.SelectMode>
          <S.ModeText>Ultrassônico</S.ModeText>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isAccelerometerSensor ? "#4361EE" : "#f4f3f4"}
            onValueChange={handleSelectSensor}
            value={isAccelerometerSensor}
          />
          <S.ModeText>Acelerômetro</S.ModeText>
        </S.SelectMode>
      </S.ContainerSelectMode>

      <PIDController
        isFreeMode={isFreeMode}
        pidValue={pidValue}
        handleClearPid={handleClearPid}
        onChangePidValue={onChangePidValue}
        handlePValueControl={handlePValueControl}
        handleIValueControl={handleIValueControl}
        handleDValueControl={handleDValueControl}
      />

      <AngleController
        isFreeMode={isFreeMode}
        sliderValue={sliderValue}
        onChangeSliderValue={onChangeSliderValue}
        handleAngleControl={handleAngleControl}
        handleClearAngle={handleClearAngle}
      />

    </S.Container>
  )
}