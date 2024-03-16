// é mais uma camada de abstração, a idéia é que todos os acessos ao "process.env"
// sejam feitos aqui, assim concentra esse acesso e permite realizar transformações
// nos envs, tipo quebra de linhas e problemas de infra
import '@/wrappers/envs';

export const PORT = Number(process.env.PORT?.trim());
