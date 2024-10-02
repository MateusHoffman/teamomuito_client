export interface TimeDifference {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function calculateTimeDifference(
  dateString: string,
  timeString: string
): TimeDifference {
  const agora = new Date();

  const [ano, mes, dia] = dateString.split("-").map(Number);
  const [horas, minutos] = timeString.split(":").map(Number);

  const dataFornecida = new Date(ano, mes - 1, dia, horas, minutos);

  let diferenca = Math.abs(agora.getTime() - dataFornecida.getTime());

  const anos = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365));
  diferenca -= anos * 1000 * 60 * 60 * 24 * 365;

  const mesesDias = [
    31,
    (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  let meses = 0;
  while (diferenca >= mesesDias[(mes - 1 + meses) % 12] * 1000 * 60 * 60 * 24) {
    diferenca -= mesesDias[(mes - 1 + meses) % 12] * 1000 * 60 * 60 * 24;
    meses++;
  }

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  diferenca -= dias * 1000 * 60 * 60 * 24;

  const horasRestantes = Math.floor(diferenca / (1000 * 60 * 60));
  diferenca -= horasRestantes * 1000 * 60 * 60;

  const minutosRestantes = Math.floor(diferenca / (1000 * 60));
  diferenca -= minutosRestantes * 1000 * 60;

  const segundos = Math.floor(diferenca / 1000);

  return {
    years: anos,
    months: meses,
    days: dias,
    hours: horasRestantes,
    minutes: minutosRestantes,
    seconds: segundos,
  };
}
