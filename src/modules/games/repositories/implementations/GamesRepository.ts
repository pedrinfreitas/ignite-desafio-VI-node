import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return (
      this.repository
        .createQueryBuilder()
        // Complete usando query builder
        .where("title ILIKE :title", { title: `%${param}%` })
        .getMany()
    );
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // return this.repository.query(); // Complete usando raw query
    return this.repository.query("SELECT COUNT(id) FROM games");
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder
    return this.repository
      .createQueryBuilder()
      .relation(Game, "users")
      .of(id)
      .loadMany();
  }
}
