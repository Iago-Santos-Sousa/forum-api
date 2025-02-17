import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  InternalServerErrorException,
} from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { Request } from "@nestjs/common";

@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createQuestionDto: CreateQuestionDto, @Request() req: any) {
    try {
      return this.questionsService.create(createQuestionDto, req);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  findOne(@Param("id") id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  update(@Param("id") id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  remove(@Param("id") id: string) {
    return this.questionsService.remove(+id);
  }
}
