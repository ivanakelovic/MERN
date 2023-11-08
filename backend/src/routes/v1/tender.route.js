const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const tenderValidation = require('../../validations/tender.validation');
const tenderController = require('../../controllers/tender.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageTenders'), validate(tenderValidation.createTender), tenderController.createTender)
  .get(auth('getTenders'), validate(tenderValidation.getTenders), tenderController.getTenders);

router
  .route('/:tenderId')
  .get(auth('getTenders'), validate(tenderValidation.getTender), tenderController.getTender)
  .patch(auth('manageTenders'), validate(tenderValidation.updateTender), tenderController.updateTender)
  .delete(auth('manageTenders'), validate(tenderValidation.deleteTender), tenderController.deleteTender);



module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Tenders
 *   description: Tender management and retrieval
 */

/**
 * @swagger
 * /tenders:
 *   post:
 *     summary: Create a tender
 *     description: Only admins can create other tenders.
 *     tags: [Tenders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - deadline
 *               - documents
 *               - criteria
 *               - weightage
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *
 *               deadline:
 *                 type: Date
 *
 *               documents:
 *                  type: File
 *               criteria:
 *                  type: String
 *               weightage:
 *                  type: Number
 *
 *
 *
 *
 *   get:
 *     summary: Get all tenders
 *     description: All users can retrieve all tenders.
 *     tags: [Tenders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Tender title
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Tender description
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. title:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of tenders
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tender'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /tenders/{id}:
 *   get:
 *     summary: Get a tender
 *     description: LoggedIn users can fetch tender information.
 *     tags: [Tenders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tender id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a tender
 *     description: LoggedIn users can only update their own information. Only admins can update other tenders.
 *     tags: [Tenders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tender id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *
 *               deadline:
 *                 type: Date
 *             example:
 *               title: Tender 1
 *               description: tender of something
 *               deadline: 06/07/2023
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Tender'
 *
 *
 *   delete:
 *     summary: Delete a tender
 *     description: Loggedin users can delete only themselves. Only admins can delete other tenders.
 *     tags: [Tenders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tender id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
