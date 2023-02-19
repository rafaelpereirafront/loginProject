import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async findAll() {
    return await this.userRepository.find({
      select: ['id','name','email'],
    });
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    return await this.userRepository.save(this.userRepository.merge(user,createUserDto));
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneOrFail({where:{id}});
    return this.userRepository.save(this.userRepository.merge(user, updateUserDto));
  }

  async findOne(id: string): Promise<User>{
    const user = await this.userRepository.findOne({where: {id}});
    return user;
  }

  async findByEmail(email: string): Promise<User>{
    const user = await this.userRepository.findOne({where: {email}});
    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({where:{id}});
    return await this.userRepository.remove(user);
  }
}
