import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Indicadores } from '../entities/Indicadores';

@Injectable()
export class IndicadoresService {
     constructor(
        @InjectRepository(Indicadores) private readonly indicadoresRepository: Repository<Indicadores>,
      ) { }
  
     async findAll(): Promise<Indicadores[]> {
         return await this.indicadoresRepository.find();
       }

  
}