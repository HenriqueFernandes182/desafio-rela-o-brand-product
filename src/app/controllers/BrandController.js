import Brand from '../models/Brand';

class BrandController {
  async index(req, res) {
    try {
      const brands = await Brand.findAll({
        attributes: ['uid', 'name'],
      });
      return res.json({ brands });
    } catch (error) {
      return res.json({ error: 'Erro ao buscar marca' });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;

      const brand = await Brand.findByPk(uid);

      return res.json({ brand });
    } catch (error) {
      return res.json(error);
    }
  }

  async store(req, res) {
    try {
      const brand = await Brand.create(req.body);

      return res.json({ brand });
    } catch (error) {
      const response = {
        message: 'dados incorretos',
        error,
      };
      return res.json({ response });
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;
      const [updated] = await Brand.update(req.body, { where: { uid } });
      if (!updated) {
        throw Error('Marca não atualizada');
      }
      return res.json({ message: 'Marca atualizada com sucesso' });
    } catch (error) {
      return res.json({ error: 'Erro ao atualizar Marca' });
    }
  }

  async delete(req, res) {
    try {
      const { uid } = req.params;

      const deleted = await Brand.destroy({ where: { uid } });

      if (!deleted) {
        throw Error('marca não encontrada');
      }

      return res.json({
        result: 'marca deletada com sucesso',
      });
    } catch (error) {
      const response = {
        message: 'dados incorretos',
        error,
      };
      return res.json({ response });
    }
  }
}

export default new BrandController();
