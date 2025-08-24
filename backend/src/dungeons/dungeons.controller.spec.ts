import { Test, TestingModule } from '@nestjs/testing';
import { DungeonsController } from './dungeons.controller';

describe('DungeonsController', () => {
  let controller: DungeonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DungeonsController],
    }).compile();

    controller = module.get<DungeonsController>(DungeonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
