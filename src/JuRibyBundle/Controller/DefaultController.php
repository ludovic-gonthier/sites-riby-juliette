<?php

namespace JuRibyBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DefaultController extends Controller
{
    public function homepageAction()
    {
        $projects = $this->get('ju_riby.projects')->load();

        return $this->render(
            'JuRibyBundle:Projects:homepage.html.twig',
            array(
                'projects' => $projects,
                '_menu' => array('selected' => 'projects')
            )
        );
    }

    public function projectAction($project)
    {
        $projects = $this->get('ju_riby.projects')->load($project);

        if (empty($projects[0])) {
            throw new NotFoundHttpException('The project was not found.');
        }

        return $this->render(
            'JuRibyBundle:Projects:project.html.twig',
            array(
                'project' => $projects[0],
                '_menu' => array('selected' => 'projects')
            )
        );
    }

    public function aProposAction()
    {
        return $this->render(
            'JuRibyBundle:APropos:index.html.twig',
            array(
                '_menu' => array('selected' => 'a_propos')
            )
        );
    }

    public function contactAction()
    {
        return $this->render(
            'JuRibyBundle:Contact:index.html.twig',
            array(
                '_menu' => array('selected' => 'contact')
            )
        );
    }
}
