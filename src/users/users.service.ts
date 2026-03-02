import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role, User} from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';


const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
    constructor( private readonly databaseService: DatabaseService) { }

    async create(createUser: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUser.password, SALT_ROUNDS);
        return this.databaseService.user.create({
            data: {
                name: createUser.name,
                email: createUser.email,
                password: hashedPassword,
                role: (createUser.role?.toUpperCase() as Role) ?? 'USER',
            },
        });
    }

    findAll(role?: string): Promise<User[]> {
        if (role) {
            return this.databaseService.user.findMany({
                where: { role: role.toUpperCase() as Role },
            });
        }
        return this.databaseService.user.findMany();
    }

    findOne(id: number): Promise<User | null> {
        return this.databaseService.user.findUnique({
            where: { id },
        });
    }

    findByEmail(email: string): Promise<User | null> {
        return this.databaseService.user.findUnique({
            where: { email },
        });
    }

    async update(id: number, updateUser: UpdateUserDto): Promise<User> {
        let hashedPassword: string | undefined;
        if (updateUser.password) {
            hashedPassword = await bcrypt.hash(updateUser.password, SALT_ROUNDS);
        }
        return this.databaseService.user.update({
            where: { id },
            data: {
               ...updateUser,
               password: hashedPassword ?? undefined,
               role: updateUser.role ? (updateUser.role.toUpperCase() as Role) : undefined,
            },
        });
    }

    remove(id: number): Promise<User> {
        return this.databaseService.user.delete({
            where: { id },
        });
    }

    async verifyPassword(
        plainPassword: string,
        hashedPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

}