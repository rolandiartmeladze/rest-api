import { Test, TestingModule } from '@nestjs/testing';
import { ViewController } from './view.controller';

describe('ViewController', () => {
  let controller: ViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViewController],
    }).compile();

    controller = module.get<ViewController>(ViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});


// import { Controller, Get, Post, Delete } from '@nestjs/common';

// @Controller('visual')
// export class VisualController {
//   @Get()
//   getVisualElement() {
//     return { message: 'Visual element fetched successfully!' };
//   }

//   @Post()
//   createVisualElement() {
//     return { message: 'Visual element created successfully!' };
//   }

//   @Delete()
//   deleteVisualElement() {
//     return { message: 'Visual element deleted successfully!' };
//   }
// }
