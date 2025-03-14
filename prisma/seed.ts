import { faker } from "@faker-js/faker";
import { $Enums, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const subjects = Object.values($Enums.Subjects);
    const ageGroups = Object.values($Enums.Level)
    const assignments = [];

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("alma", saltRounds);

    
    for (let i = 0; i < 20; i++) {
        const randomAssignment = faker.helpers.arrayElement(assignments);
        const fName = faker.person.firstName();
        const lName = faker.person.lastName();
        
        await prisma.teacher.create({
            data: {
                hourlyRate: faker.number.int({min: 1000, max:90000}),
                user: {
                    connect: {
                        id: i
                    }
                },
                rating: faker.number.float({min: 1, max: 5, fractionDigits: 1}),
                subject: faker.helpers.arrayElement(subjects)
            },
        });
    }
    
   
    for (let i = 0; i < 100; i++) {
        const randomSubject = faker.helpers.arrayElement(subjects);
        const assignment = await prisma.assignment.create({
            data: {
                subject: randomSubject,
                ageGroup: faker.helpers.arrayElement(ageGroups),
                description: faker.person.bio(),
                name: faker.science.chemicalElement().name + "előállítás feladat",
                teacher: {
                    connect: {
                        id: i%20
                    }
                }
            }
        });
        assignments.push(assignment);
    }
    
    await prisma.admin.create({
        data: {
            name: faker.person.fullName(),
            email: `${faker.person.firstName()}@citromail.com`,
            password: "alma"
        }
    })
}

main()
  .then(async () => {
    console.log('Database seeded successfully!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
