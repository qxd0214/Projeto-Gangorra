export async function requestAccessFineLocation() {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: "Permissão de localização",
      message:
        "O aplicativo precisa de permissão para acessar a localização para funcionar corretamente",
      buttonNeutral: "Pergunte-me depois",
      buttonNegative: "Cancelar",
      buttonPositive: "OK"
    }
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;

  return false;
}