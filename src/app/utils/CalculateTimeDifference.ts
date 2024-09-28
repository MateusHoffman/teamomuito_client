import {
  differenceInYears,
  differenceInCalendarMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  subMonths,
  subYears,
  subDays,
} from "date-fns";

export const calculateTimeDifference = (
  dateString: string,
  timeString: string
): TimeDifference => {
  // Divide a string da data em partes
  const [year, month, day] = dateString.split("-").map(Number);
  const [hours, minutes] = timeString.split(":").map(Number);

  // Verifica se todos os valores são válidos
  if (
    isNaN(year) ||
    isNaN(month) ||
    isNaN(day) ||
    isNaN(hours) ||
    isNaN(minutes)
  ) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  // Cria um objeto Date a partir das informações fornecidas
  const startDate = new Date(year, month - 1, day, hours, minutes);

  // Data e hora atuais
  const now = new Date();

  // Calcula a diferença em anos
  const years = differenceInYears(now, startDate);

  // Subtrai os anos da data atual para calcular os meses restantes
  const dateAfterYears = subYears(now, years);

  // Calcula a diferença em meses, levando em conta o calendário
  const months = differenceInCalendarMonths(dateAfterYears, startDate);

  // Subtrai os meses da data atual para calcular os dias restantes
  const dateAfterMonths = subMonths(dateAfterYears, months);
  const days = differenceInDays(dateAfterMonths, startDate);

  // Agora, vamos calcular horas, minutos e segundos diretamente da data original
  const remainingHours = differenceInHours(now, startDate) % 24;
  const remainingMinutes = differenceInMinutes(now, startDate) % 60;
  const remainingSeconds = differenceInSeconds(now, startDate) % 60;

  return {
    years,
    months,
    days,
    hours: remainingHours,
    minutes: remainingMinutes,
    seconds: remainingSeconds,
  };
};

export interface TimeDifference {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
