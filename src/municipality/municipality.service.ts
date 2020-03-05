import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTownDto } from './dto/createTown.dto';
import { Vereda } from '../entities/Vereda';
import { Municipio } from '../entities/Municipio';
import { UpdateTownDto } from './dto/updateTown.dto';

@Injectable()
export class MunicipalityService {

  constructor(
    @InjectRepository(Municipio) private readonly municipalityRepository: Repository<Municipio>,
    @InjectRepository(Vereda) private readonly townRepository: Repository<Vereda>
  ) { }

  async createTown(body: CreateTownDto) {
    try {
      await this.townRepository.save(body)
      return { success: 'OK' }
    } catch (error) {
      return { error }
    }
  }
  async updateTown(body: UpdateTownDto) {
    const exist = await this.townRepository.findOne({ select: ["nombre"], where: { id: body.id } })
    if (!exist)
      return { error: 'TOWN_NOT_EXIST', detail: 'La vereda no existe' }

    await this.townRepository.update(body.id, body)

    return { success: 'OK' }
  }
  async getTownMunicipality(idMunicipio: number) {
    return await this.municipalityRepository.find({ relations: ["veredas"], where: { id: idMunicipio } })
  }

}