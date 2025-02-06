import { faker } from "@faker-js/faker";
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const subjects = ["Matematika", "Történelem", "Kémia", "Informatika", "Irodalom"];
    const assignments = [];

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("alma", saltRounds);

    for (let i = 0; i < 100; i++) {
        const randomSubject = faker.helpers.arrayElement(subjects);
        const assignment = await prisma.assignment.create({
            data: {
                subject: randomSubject,
                ageGroup: faker.helpers.arrayElement(["alsos", "felsos", "kozep_isk", "felso_okt"]),
                assignments: faker.lorem.lines(),
            },
        });
        assignments.push(assignment);
    }

    for (let i = 0; i < 20; i++) {
        const randomAssignment = faker.helpers.arrayElement(assignments);
        const fName = faker.person.firstName();
        const lName = faker.person.lastName();

        await prisma.teacher.create({
            data: {
                name: `${fName} ${lName}`,
                subjectTeacher: randomAssignment.subject,
                hourlyRate: faker.number.int({ min: 2000, max: 10000 }),
                email: `${fName.toLowerCase()}.${lName.toLowerCase()}${Math.floor(Math.random() * 1000)}@citromail.com`,
                numberOfStudents: 0,
                rating: faker.number.int({ min: 1, max: 10 }),
                assignmentId: randomAssignment.id,
                password: hashedPassword,
                role: "Teacher"
            },
        });
    }

    for (let i = 0; i < 20; i++) {
        const randomAssignment = faker.helpers.arrayElement(assignments);
        const fName = faker.person.firstName();
        const lName = faker.person.lastName();

        await prisma.student.create({
            data: {
                name: `${fName} ${lName}`,
                ageGroup: faker.helpers.arrayElement(["alsos", "felsos", "kozep_isk", "felso_okt"]),
                email: `${fName.toLowerCase()}.${lName.toLowerCase()}${Math.floor(Math.random() * 1000)}@citromail.com`,
                assignmentId: randomAssignment.id,
                password: hashedPassword,
                role: "Student"
            },
        });
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
