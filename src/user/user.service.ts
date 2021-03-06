import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserRepository) private readonly _userRepository: UserRepository,
  ) { }

  async findOne(user: string) {
    const userFind = await this._userRepository.findOne({
      where: { user },
    });

    if (!userFind) throw new BadRequestException("email does not exist");

    return userFind
  }

  async getAll() {
    return await this._userRepository.find();
  }

  async get(id: number) {
    if (!id) throw new BadRequestException("id must be sent");

    const user = await this._userRepository.findOne(id, {});

    if (!user) throw new NotFoundException();

    return user;
  }
}