import { Body, ConflictException, Controller, Get, InternalServerErrorException, Post } from '@nestjs/common';
import { Pool } from 'pg';

@Controller('mvstCoffee')
export class AppController {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'mvst-coffee-challenge-db',
      password: '1234',
      port: 5432,
    });
  }

  @Get('generalInfo')
  async fetchGeneralInfo() {
    try {
      const result = await this.pool.query('SELECT content FROM general_info LIMIT 1');
      if (result.rows.length === 0) {
        throw new InternalServerErrorException('No general info found');
      }
      return result.rows[0].content;
    } catch (err) {
      console.error('Error fetching general info:', err);
      throw new InternalServerErrorException('Failed to fetch general info');
    }
  }

  @Get('coffees')
  async fetchCoffees() {
    try {
      const result = await this.pool.query(`
        SELECT c.id, c.title, c.description, c.image_url, t.name AS type, t.color, c.price
        FROM coffee c
        JOIN coffee_types t ON c.coffee_type_id = t.id;`);
      return result.rows;
    } catch (err) {
      console.error('Error fetching coffees:', err);
      throw new InternalServerErrorException('Failed to fetch coffees');
    }
  }

 @Post('createCoffee')
  async createCoffee(@Body() body: any) {
    const { title, description, imageUrl, type, price } = body;

    try {
      const existing = await this.pool.query(
        'SELECT id FROM coffee WHERE title = $1',
        [title]
      );

      if (existing.rows.length > 0) {
        throw new ConflictException('A coffee with this name already exists.');
      }

      const result = await this.pool.query(
        `INSERT INTO coffee (title, price, image_url, description, coffee_type_id)
        VALUES ($1, $2, $3, $4, 
          (SELECT id FROM coffee_types WHERE name = $5)
        ) RETURNING *`,
        [title, price, imageUrl, description, type]
      );

      return result.rows[0];
    } catch (err) {
      console.error('Error creating coffee:', err);
      if (err instanceof ConflictException) throw err;
      throw new InternalServerErrorException('Failed to create coffee');
    }
  }


  @Get('coffeeTypes')
  async fetchCoffeeTypes() {
    try {
      const result = await this.pool.query("SELECT name, color FROM coffee_types;");
      return result.rows;
    } catch (err) {
      console.error('Error fetching coffee types:', err);
      throw new InternalServerErrorException('Failed to fetch coffee types');
    }
  }


  @Get('newCoffeeModal')
  async fetchNewCoffeeModal() {
    try {
      const result = await this.pool.query("SELECT * FROM modals WHERE modal_key = 'new_coffee';");
      if (result.rows.length === 0) {
        throw new InternalServerErrorException('No modal data found');
      }
      return result.rows[0];
    } catch (err) {
      console.error('Error fetching new coffee modal:', err);
      throw new InternalServerErrorException('Failed to fetch new coffee modal');
    }
  }
}
