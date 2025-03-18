import { faker } from "@faker-js/faker";
import { $Enums, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const subjects = Object.values($Enums.Subjects);
    const ageGroups = Object.values($Enums.Level);
    const assignments = [];

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("alma", saltRounds);

    let i = 0;

    const users = await Promise.all(
        Array.from({ length: 20 }).map(async () => {
            var firstN = faker.person.firstName();
            var lastN = faker.person.lastName();
            i++;
            if(i%2==0){
                return prisma.user.create({
                    data: {
                        firstName: firstN,
                        lastName: lastN,
                        email: `${lastN}.${firstN}@citromail.com`,
                        password: await bcrypt.hash("alma", saltRounds),
                        role: $Enums.Role.Student
                    },
                });
            }
            else{
                return prisma.user.create({
                    data: {
                        firstName: firstN,
                        lastName: lastN,
                        email: `${lastN}.${firstN}@citromail.com`,
                        password: await bcrypt.hash("alma", saltRounds),
                        role: $Enums.Role.Teacher
                    },
                });
            }
        })
    );

    const teachers = await Promise.all(
        users.map(async (user) => {
            return prisma.teacher.create({
                data: {
                    hourlyRate: faker.number.int({ min: 1000, max: 90000 }),
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
                    rating: faker.number.float({ min: 1, max: 10, fractionDigits: 1 }),
                    subject: faker.helpers.arrayElement(subjects),
                },
            });
        })
    );

    const students = await Promise.all(
        users.map(async (user) => {
            return prisma.student.create({
                data: {
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
                    ageGroup: faker.helpers.arrayElement(ageGroups),
                }
            })
        })
    )

    for (let i = 0; i < 100; i++) {
        const randomTeacher = faker.helpers.arrayElement(teachers);
        const assignment = await prisma.assignment.create({
            data: {
                subject: faker.helpers.arrayElement(subjects),
                ageGroup: faker.helpers.arrayElement(ageGroups),
                description: faker.person.bio(),
                name: faker.science.chemicalElement().name + " előállítás feladat",
                teacher: {
                    connect: {
                        id: randomTeacher.id,
                    },
                },
            },
        });
        assignments.push(assignment);
    }

    await prisma.admin.create({
        data: {
            name: faker.person.fullName(),
            email: `${faker.person.firstName()}@citromail.com`,
            password: hashedPassword,
        },
    });

    console.log("Database seeded successfully!");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
