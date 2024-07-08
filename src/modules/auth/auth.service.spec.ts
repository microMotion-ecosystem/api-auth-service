import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return jwt token when login is successful', async () => {
    // Arrange
    const expectedJwtToken = 'jwtToken';
    const loginDto = { username: 'test', password: 'password' };
    jest.spyOn(service, 'login').mockImplementation(async () => {
      return { access_token: expectedJwtToken };
    });

    // Act
    const result = await service.login(loginDto);

    // Assert
    expect(result).toBe(expectedJwtToken);
  });
});
