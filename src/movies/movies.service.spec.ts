import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'test movie',
        year: 2000,
        genres: ['test'],
      });
      const afterCreate = service.getAll().length;
      expect(beforeCreate).toBeLessThan(afterCreate); //movie가 생성되는지 확인
    });
  });

  describe('getAll', () => {
    it('should be return array', () => {
      expect(service.getAll()).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should be return movie', () => {
      service.create({
        title: 'test movie',
        year: 2000,
        genres: ['test'],
      });
      expect(service.getOne(1)).toBeDefined(); //movie가 생성됐는지 확인
      expect(service.getOne(1).id).toEqual(1); //movie id 가 1 인지 확인
      expect(service.getOne(1).title).toEqual('test movie'); //movie title이 "test movie" 인지 확인
      expect(service.getOne(1).year).toEqual(2000); //movie year가 2000인지 확인
      expect(service.getOne(1).genres).toEqual(['test']); //movie genres가 ["text"]인지 확인
    });
    it('should be throw 404', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException); //404 확인
        expect(error.message).toEqual('Movie with ID: 999 not found.'); //404 메세지 내용 확인
      }
    });
  });
  describe('deleteOne', () => {
    it('delete a movie', () => {
      service.create({
        title: 'test movie',
        year: 2000,
        genres: ['test'],
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete); //movie가 삭제되는지 확인
    });

    it('should return 404', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException); //404 확인
        expect(error.message).toEqual('Movie with ID: 999 not found.'); //404 메세지 내용 확인
      }
    });
  });
  describe('update', () => {
    it('should be update a movie', () => {
      service.create({
        title: 'test movie',
        year: 2000,
        genres: ['test'],
      });
      service.update(1, { title: 'Update movie' });
      expect(service.getOne(1).title).toEqual('Update movie'); //movie가 업데이트 되는지 확인
    });

    it('should be return 404', () => {
      expect(() => service.update(999, { title: 'Update movie' })).toThrowError(
        new NotFoundException('Movie with ID: 999 not found.'), //404 확인
      );
    });
  });
});
