"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs/typeorm/dist");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll() {
        return await this.userRepository.find({
            select: ['id', 'name', 'email'],
        });
    }
    async create(createUserDto) {
        const user = new user_entity_1.User();
        return await this.userRepository.save(this.userRepository.merge(user, createUserDto));
    }
    async update(id, updateUserDto) {
        const user = await this.userRepository.findOneOrFail({ where: { id } });
        return this.userRepository.save(this.userRepository.merge(user, updateUserDto));
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        return user;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        return user;
    }
    async remove(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        return await this.userRepository.remove(user);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, dist_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map