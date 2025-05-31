export const projectConstants = Object.freeze({
    token: 'eventofacil:accessToken',
});

export const transformedEventType = {
    'presencial': 'in-person',
    'online': 'online'
  }
export const transformedEventStatus = {
    'Ativo': 'active',
    'Concluido': 'completed',
    'Cancelado': 'cancelled'
}
export const statusMap = {
  ativo: 'active',
  cancelado: 'cancelled',
  concluido: 'completed',
};
export const getStatusKeyByValue = (value: string) => {
  return Object.keys(statusMap).find(key => statusMap[key as keyof typeof statusMap] === value);
};
export const getTypeKeyByValue = (value: string) => {
  return Object.keys(transformedEventType).find(key => transformedEventType[key as keyof typeof transformedEventType] === value);
};

export const defaultImgUrl = 'https://images.unsplash.com/photo-1566159171006-5165eaf723a6?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
