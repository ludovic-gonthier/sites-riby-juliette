<?php

namespace JuRibyBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function projectsAction($project)
    {
        $projects = $this->get('ju_riby.projects')->load($project);

        return $this->render(
            'JuRibyBundle:Projects:index.html.twig',
            array(
                'projects' => $projects,
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
