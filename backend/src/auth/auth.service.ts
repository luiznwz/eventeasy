import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
    Logger,
} from "@nestjs/common";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/entities/user.entity";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto) {
        try {
            const user = await this.userRepository.findOneBy({ email: loginDto.email });
            if (!user) {
                this.logger.warn(`Tentativa de login com e-mail inexistente: ${loginDto.email}`);
                throw new UnauthorizedException("Credenciais inválidas.");
            }

            const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
            if (!isPasswordValid) {
                this.logger.warn(`Tentativa de login com senha incorreta para: ${loginDto.email}`);
                throw new UnauthorizedException("Credenciais inválidas.");
            }

            const token = this.generateToken({ id: user.id, email: user.email });
            const { name } = user;
            return { name, token };
        } catch (error) {
            this.logger.error("Erro no processo de login", error.stack);
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new InternalServerErrorException("Ocorreu um erro interno. Tente novamente mais tarde.");
        }
    }

    generateToken(payload: { id: string; email: string }): string {
        try {
            return this.jwtService.sign(payload);
        } catch (error) {
            this.logger.error("Erro ao gerar token", error.stack);
            throw new InternalServerErrorException("Falha ao gerar token de acesso.");
        }
    }

    async validateToken(token: string) {
        try {
            const validate = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            return validate;
        } catch (error) {
            this.logger.warn("Token inválido ou expirado", error.stack);
            throw new UnauthorizedException("Token inválido ou expirado.");
        }
    }
}
